import { SoftInputComponent } from './../soft-input/soft-input.component';
import { SoftIncreService } from './../../services/soft-incre.service';
import { SoftPositionService } from './../../services/soft-position.service';
import { downToUpAnimation } from './../../animations/down-to-up-animation';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import {
  Component, OnInit, Input, Provider, forwardRef, Output, EventEmitter,
  ElementRef, ViewChild, OnDestroy, NgZone
} from '@angular/core';
import { Observable, Observer, Subscription } from 'rxjs';

declare var moment: any;

export const SoftDatetimePickerValueAccessor: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SoftDatetimePickerComponent),
  multi: true
};

@Component({
  selector: 'soft-datetime-picker',
  templateUrl: './soft-datetime-picker.component.html',
  styleUrls: ['./soft-datetime-picker.component.scss'],
  providers: [SoftDatetimePickerValueAccessor],
  animations: [downToUpAnimation]
})
export class SoftDatetimePickerComponent implements OnInit, ControlValueAccessor, OnDestroy {
  @ViewChild('inputEl')
  inputEl: SoftInputComponent;
  @ViewChild('picker')
  pickerEl: ElementRef;
  @Input()
  size: 'mini' | 'small' | 'default' | 'large' = 'default';
  @Input()
  disabled: boolean;
  @Input()
  required: boolean;
  @Input()
  showTime: boolean = false;
  @Input()
  showDate: boolean = true;
  @Input()
  timespan: number;
  @Input()
  format: string = 'YYYY-MM-DD'; // 详见moment格式 http://momentjs.cn/docs/#/parsing/string-format/
  @Output()
  change: EventEmitter<any> = new EventEmitter();
  inputModel: any;
  model: Date;
  show: boolean;
  topValue: number;
  currentPanel: 'year' | 'month' | 'day' = 'day';
  currentYear: number;
  currentMonth: number;
  currentDay: number;
  currentHour: number;
  currentMinute: number;
  currentSecond: number;
  placement: 'top' | 'bottom';
  offset: number;
  zIndex: number;
  // 1号是周几, 需要前置空几格
  spacePrefix: number;
  // 日期列表
  dayList: CalendarItem[];
  timeList: TimeItem[];
  private onChangedCallback: (_) => void;
  private onTouchedCallback: () => void;
  private dateAreaMaxHeight = 350;
  private subscription: Subscription;
  weekList: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];
  monthList: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  yearList: number[];
  constructor(
    private posService: SoftPositionService,
    private incre: SoftIncreService,
    private host: ElementRef,
    private ngZone: NgZone
  ) { }

  ngOnInit() {
    this.subscription = Observable.fromEvent(document, 'click').subscribe((e) => {
      if (!this.show || this.host.nativeElement.outerHTML.indexOf(e.target['outerHTML']) >= 0) {
        return;
      }
      this.show = false;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onFocus(event) {
    if (this.disabled) {
      return;
    }
    this.currentPanel = 'day';
    this.getPlacement().subscribe(p => {
      this.getPickerStyle();
      if (this.showDate) {
        const now = this.model || new Date();
        this.setCurrentDate(now);
        this.getDayList(now);
      }
      if (this.showTime) {
        const now = this.model || new Date();
        this.setCurrentTime(now);
        this.getTimeList();
      }
      this.placement = p;
      this.show = true;
    });
  }

  private getYearList(direct: number) {
    let year: number;
    if (direct > 0) {
      year = (this.yearList[this.yearList.length - 1] || new Date().getFullYear()) + 6;
    } else if (direct < 0) {
      year = (this.yearList[0] || new Date().getFullYear()) - 7;
    } else {
      year = this.currentYear || new Date().getFullYear();
    }
    let first = year - 5;
    const last = year + 6;
    const yearList: number[] = [];
    while (first <= last) {
      yearList.push(first);
      first++;
    }
    this.yearList = yearList;
  }

  onSelectedYear(year: number) {
    this.currentYear = year;
    this.currentPanel = 'month';
  }

  onSelectedMonth(index: number) {
    this.currentMonth = index;
    this.getDayList(new Date(this.currentYear, this.currentMonth, this.currentDay));
    this.currentPanel = 'day';
  }

  onSelectedDay(item: CalendarItem) {
    this.model = this.model || new Date();
    this.model.setFullYear(item.year);
    this.model.setMonth(item.month);
    this.model.setDate(item.day);
    this.setCurrentDate(this.model);
    // this.model = new Date(this.currentYear, this.currentMonth, this.currentDay);
    this.inputModel = this.formatDateTime(this.model);
    this.setModel();
    this.hide();
  }

  onSelectTime(time: TimeItem) {
    this.model = this.model || new Date();
    this.model.setHours(time.hour);
    this.model.setMinutes(time.minute);
    this.model.setSeconds(time.second);
    this.setCurrentTime(this.model);
    this.inputModel = this.formatDateTime(this.model);
    this.setModel();
  }

  changePanel() {
    if (this.currentPanel === 'day') {
      this.currentPanel = 'month';
    } else if (this.currentPanel === 'month') {
      this.currentPanel = 'year';
      this.getYearList(0);
    }
  }

  next() {
    if (this.currentPanel === 'year') {
      this.getYearList(1);
    } else if (this.currentPanel === 'day') {
      this.currentMonth++;
      if (this.currentMonth > 11) {
        this.currentMonth = 0;
        this.currentYear++;
      }
      const maxDateOfMonth = this.getMaxDayOfMonth(this.currentYear, this.currentMonth);
      if (this.currentDay > maxDateOfMonth) {
        this.currentDay = maxDateOfMonth;
      }
      this.getDayList(new Date(this.currentYear, this.currentMonth, this.currentDay));
    }
  }

  prev() {
    if (this.currentPanel === 'year') {
      this.getYearList(-1);
    } else if (this.currentPanel === 'day') {
      this.currentMonth--;
      if (this.currentMonth < 0) {
        this.currentMonth = 11;
        this.currentYear--;
      }
      const maxDateOfMonth = this.getMaxDayOfMonth(this.currentYear, this.currentMonth);
      if (this.currentDay > maxDateOfMonth) {
        this.currentDay = maxDateOfMonth;
      }
      this.getDayList(new Date(this.currentYear, this.currentMonth, this.currentDay));
    }
  }

  writeValue(obj: any): void {
    if (!obj) {
      this.model = null;
      this.inputModel = '';
    } else {
      if (this.model !== obj) {
        if (obj instanceof Date) {
          this.model = obj;
        } else if (obj instanceof Number) {
          this.model = new Date(obj as number);
        } else {
          this.model = null;
        }
        this.ngZone.run(() => {
          this.inputModel = this.formatDateTime(this.model)
        });
      }
    }
  }
  registerOnChange(fn: any): void {
    this.onChangedCallback = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouchedCallback = fn;
  }

  onInputValueChange(event) {
    this.model = this.convertStringToDate(event);
  }

  getPickerStyle() {
    const size = this.posService.getElementSize(this.inputEl.inputElement.nativeElement);
    if (this.placement === 'top') {
      this.topValue = 0 - size.height;
    } else {
      this.topValue = size.height;
    }
  }

  getTimePickerStyle() {
    if (this.showDate && this.showTime) {
      const height = (this.dayList.length / 7) * 40 + 44;
      return {
        height: height + 'px'
      }
    }
    return {};
  }

  formatDigist(value: number): string {
    let result = value.toString();
    while (result.length < 2) {
      result = '0' + result;
    }
    return result;
  }

  private setModel() {
    const dt = new Date(this.model.getFullYear(), this.model.getMonth(), this.model.getDate(),
      this.model.getHours(), this.model.getMinutes(), this.model.getSeconds());
    if (this.onChangedCallback) {
      this.onChangedCallback(dt);
    }
    if (this.onTouchedCallback) {
      this.onTouchedCallback();
    }
    this.change.emit(dt);
  }

  private getMaxDayOfMonth(year: number, month: number): number {
    const smallMonths = [4, 6, 9, 11];
    if (smallMonths.indexOf(month + 1) >= 0) {
      return 30;
    } else if (month + 1 === 2) {
      return this.isLeap(year) ? 29 : 28;
    } else {
      return 31;
    }
  }

  private isLeap(year: number): boolean {
    return (((year % 4) === 0) && ((year % 100) !== 0) || ((year % 400) === 0));
  }

  private setCurrentDate(now: Date) {
    this.currentDay = now.getDate();
    this.currentMonth = now.getMonth();
    this.currentYear = now.getFullYear();
  }

  private setCurrentTime(now: Date) {
    this.currentHour = now.getHours();
    this.currentMinute = now.getMinutes();
    this.currentSecond = now.getSeconds();
  }

  // 获取月初直至周日的日期
  private getPrevSunday(date: Date) {
    const now = new Date(date.getFullYear(), date.getMonth(), 1);
    while (now.getDay() !== 0) {
      now.setDate(now.getDate() - 1);
    }
    return now;
  }

  // 获取月尾直至周六的日期
  private getNextSatuday(date: Date) {
    const now = new Date(date.getFullYear(), date.getMonth(), this.getMaxDayOfMonth(date.getFullYear(), date.getMonth()));
    while (now.getDay() !== 6) {
      now.setDate(now.getDate() + 1);
    }
    return now;
  }

  private getDayList(now: Date) {
    // 如果月初1号不是周日，则补足上月天数直至周日
    const startDate = this.getPrevSunday(now);
    // 如果月末不是周六，则补足下月天数直至周六
    const endDate = this.getNextSatuday(now);
    const dayList: CalendarItem[] = [];
    // 计算当月的日期列表，并填充头尾
    while (startDate <= endDate) {
      dayList.push({
        year: startDate.getFullYear(),
        month: startDate.getMonth(),
        day: startDate.getDate(),
        weekNo: startDate.getDay(),
      });
      startDate.setDate(startDate.getDate() + 1);
    }
    this.dayList = dayList;
  }

  private getTimeList() {
    const maxHour = 24;
    const maxMinutes = 60;
    let remainder = 0;
    const timespan = this.timespan || 30;
    const timeList: TimeItem[] = [];
    for (let hour = 0; hour < maxHour; hour++) {
      let m = remainder;
      while (m < maxMinutes) {
        timeList.push({
          hour: hour,
          minute: m,
          second: 0
        });
        m = m + timespan
      }
      remainder = timespan - (maxMinutes - (m - timespan));
    }
    this.timeList = timeList;
    // const now = this.model || new Date();
    // const startTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);
    // const endTime = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    // const timeSpan = this.timespan || 30;
    // const timeList: TimeItem[] = [];
    // while (startTime < endTime) {
    //   timeList.push({
    //     hour: startTime.getHours(),
    //     minute: startTime.getMinutes(),
    //     second: startTime.getSeconds()
    //   });
    //   startTime.setMinutes(startTime.getMinutes() + timeSpan);
    // }
    this.timeList = timeList;
  }
  private convertStringToDate(value: string): Date {
    if (!value) {
      return null;
    }
    return moment(value, this.format).toDate();
  }

  private getPlacement(): Observable<'top' | 'bottom'> {
    return Observable.create((observer: Observer<'top' | 'bottom'>) => {
      const posInView = this.posService.getPositionInView(this.inputEl.inputElement.nativeElement);
      const windowSize = this.posService.getWindowSize();
      setTimeout(() => {
        const elSize = this.posService.getElementSize(this.inputEl.inputElement.nativeElement);
        this.offset = elSize.height;
        let placement = null;
        if (windowSize.height - posInView.top - elSize.height <= this.dateAreaMaxHeight) {
          placement = 'top';
        } else {
          placement = 'bottom';
        }
        const incre = this.incre.getNum();
        this.zIndex = Math.floor(10000 + incre);
        observer.next(placement);
        observer.complete();
      }, 0);
    });
  }

  private formatDateTime(dt: Date): string {
    if (!dt) {
      return '';
    }
    return moment(dt).format(this.format);
  }

  private hide() {
    if (this.show && !this.showTime) {
      this.show = false;
    }
  }
}

export interface CalendarItem {
  year: number;
  month: number;
  day: number;
  weekNo: number;
};

export interface TimeItem {
  hour: number;
  minute: number;
  second: number;
}
