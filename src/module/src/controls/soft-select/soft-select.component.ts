import { SoftIncreService } from './../../services/soft-incre.service';
import { SoftPositionService } from './../../services/soft-position.service';
import { SoftPager } from './../../models/soft-pager';
import { SoftPagerService } from './../../services/soft-pager.service';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import {
  Component, OnInit, forwardRef, Input, Output, EventEmitter, ContentChild, TemplateRef,
  ViewChild, ElementRef, OnChanges, SimpleChanges, Renderer2
} from '@angular/core';
import { Observable, Observer, Subscription } from 'rxjs';

export const SoftSelectValueAccessor: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SoftSelectComponent),
  multi: true
};

@Component({
  selector: 'soft-select',
  templateUrl: './soft-select.component.html',
  styleUrls: ['./soft-select.component.scss'],
  providers: [SoftSelectValueAccessor]
})
export class SoftSelectComponent implements OnInit, OnChanges, ControlValueAccessor {
  @ViewChild('selection')
  selectionEl: ElementRef;
  @Input()
  items: Array<any>;
  @Input()
  size: 'large' | 'default' | 'small' | 'mini' = 'default';
  @Input()
  ajax: boolean;
  @Input()
  noDataTitle: string = 'No Data';
  @Input()
  searchingTitle: string = 'Searching';
  @Input()
  showInputBox: boolean = true;
  @Input()
  minLengthForSearch: number = 0;
  @Input()
  name: string;
  @Input()
  disabled: boolean;
  @Input()
  placeholder: string = '';
  @Input()
  displayLabel: string;
  @Input()
  keyField: string = 'id';
  @Input()
  valueField: string = 'text';
  @Input()
  clearable: boolean = true;
  @Input()
  required: boolean;
  @Output()
  dataSource: EventEmitter<any> = new EventEmitter();
  @Output()
  selectChange: EventEmitter<any> = new EventEmitter();
  @ContentChild('format')
  formatTemplate: TemplateRef<any>;
  model: any;
  focus: boolean;
  datas: Array<any>;
  keyword: string;
  searching: boolean;
  optionListMaxHeight: number = 200;
  placement: 'top' | 'bottom' = 'bottom';
  zIndex: number = 999;
  private timeout: any;
  private pager: SoftPager;
  private onChangedCallback: (_) => void;
  private onTouchedCallback: () => void;
  private getDataSubscription: Subscription;
  private globalListener: Function;
  private offset: number;
  private scrollLoading: boolean;
  private hasMore: boolean;
  constructor(
    private pagerService: SoftPagerService,
    private posService: SoftPositionService,
    private renderer: Renderer2,
    private increService: SoftIncreService
  ) {
    this.pager = this.pagerService.initPager();
  }

  ngOnInit() {
    this.globalListener = this.renderer.listen('document', 'click', () => {
      if (this.focus) {
        this.onBlur();
      }
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    const itemsChange = changes['items'];
    if (itemsChange && itemsChange.previousValue !== itemsChange.currentValue) {
      this.initItems(this.items);
    }
  }

  writeValue(obj: any): void {
    this.model = !obj && this.model ? null : (obj && this.model !== obj ? obj : this.model);
    if (!this.ajax && this.model && this.items && this.items.length) {
      this.items.map(d => {
        if (d[this.keyField] === this.model) {
          this.displayLabel = d[this.valueField];
        }
      });
    }
  }
  registerOnChange(fn: any): void {
    this.onChangedCallback = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouchedCallback = fn;
  }

  onToggle(event) {
    if (!this.disabled) {
      if (!this.focus) {
        const posInView = this.posService.getPositionInView(this.selectionEl.nativeElement);
        const windowSize = this.posService.getWindowSize();
        setTimeout(() => {
          const elSize = this.posService.getElementSize(this.selectionEl.nativeElement);
          this.offset = elSize.height;
          if (windowSize.height - posInView.top - elSize.height <= this.optionListMaxHeight) {
            this.placement = 'top';
          } else {
            this.placement = 'bottom';
          }
          this.onFocus();
          this.getData();
          const incre = this.increService.getNum();
          this.zIndex = Math.floor(10000 + incre);
        }, 0);
      } else {
        this.onBlur();
      }
    }
    this.stopPropagation(event);
  }

  onFocus() {
    this.focus = true;
    this.keyword = '';
  }

  onBlur() {
    this.focus = false;
    if (this.onTouchedCallback) {
      this.onTouchedCallback();
    }
  }

  onKeywordChange(event) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.getData();
    }, 500);
  }

  onSelectItem(item: any, event: Event) {
    if (!item.disabled) {
      this.model = item[this.keyField];
      this.displayLabel = item[this.valueField];
      if (this.onChangedCallback) {
        this.onChangedCallback(this.model);
      }
      if (this.onTouchedCallback) {
        this.onTouchedCallback();
      }
      this.selectChange.emit(item);
      this.focus = false;
    }
    this.stopPropagation(event);
  }

  onRemove(event: Event) {
    this.model = null;
    if (this.onChangedCallback) {
      this.onChangedCallback(this.model);
    }
    if (this.onTouchedCallback) {
      this.onTouchedCallback();
    }
    this.displayLabel = null;
    this.selectChange.emit(null);
    this.stopPropagation(event);
  }

  onOptionsScroll(event) {
    const visibleHeight = Math.floor(event.target.clientHeight);
    const scrollTop = Math.floor(event.target.scrollTop);
    const contentHeight = Math.floor(event.target.scrollHeight);
    if (visibleHeight + scrollTop >= contentHeight && !this.scrollLoading && this.hasMore) {
      this.scrollLoading = true;
      this.getData(true);
    }
  }

  private initItems(datas) {
    datas = datas || [];
    if (datas.length) {
      this.datas = this.pager.currentPage === 1 ? [] : (this.datas || []);
      datas.map(d => {
        d[this.keyField] = d[this.keyField] + '';
        this.datas.push(d);
      });
    } else {
      if (this.pager.currentPage === 1) {
        this.datas = [];
      }
    }
  }

  stopPropagation(event: Event) {
    event && event.stopPropagation();
  }

  private getData(pager?: boolean) {
    if ((this.keyword || '').length >= this.minLengthForSearch) {
      if (this.ajax) {
        this.pager.currentPage = pager ? (this.pager.currentPage + 1) : 1;
        this.datas = pager ? this.datas : null;
        this.getDataForAjax(this.keyword);
      } else {
        this.initItems(this.filterItems(this.keyword));
      }
    }
  }

  // 根据keyword 向api查询
  private getDataForAjax(keyword) {
    if (this.getDataSubscription) {
      this.getDataSubscription.unsubscribe();
    }
    this.getDataSubscription = this.dataHandle(keyword).subscribe((data) => {
      this.initItems(data);
      this.hasMore = (data || []).length >= this.pager.pageSize;
      this.scrollLoading = false;
    });
  }

  // 过滤现有列表
  private filterItems(keyword): Array<any> {
    let result = [];
    if (this.focus) {
      if (!this.keyword) {
        result = this.items;
      } else {
        result = this.items.filter(d => (d[this.valueField] || '').indexOf(keyword) >= 0);
      }
    }
    return result;
  }

  private dataHandle(keyword): Observable<Array<any>> {
    return Observable.create((observer: Observer<Array<any>>) => {
      this.searching = true;
      this.dataSource.emit({
        params: {
          text: keyword,
          page: this.pager.currentPage,
          pageSize: this.pager.pageSize
        },
        success: (datas) => {
          this.searching = false;
          observer.next(datas);
          observer.complete();
        },
        error: () => {
          this.searching = false;
          observer.next([]);
          observer.complete();
        }
      });
    });
  }

  getStyle() {
    const style: any = {};
    style['z-index'] = this.zIndex;
    if (this.placement === 'top') {
      style.bottom = this.offset + 'px';
    }
    if (this.placement === 'bottom') {
      style.top = this.offset + 'px';
    }
    return style;
  }
}
