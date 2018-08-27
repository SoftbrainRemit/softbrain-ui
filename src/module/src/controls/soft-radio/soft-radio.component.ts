import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { Component, OnInit, forwardRef, Input, ElementRef, ViewChild, Output, EventEmitter } from '@angular/core';

export const SoftRadioValueAccessor: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SoftRadioComponent),
  multi: true
};

@Component({
  selector: 'soft-radio',
  templateUrl: './soft-radio.component.html',
  styleUrls: ['./soft-radio.component.scss'],
  providers: [SoftRadioValueAccessor]
})
export class SoftRadioComponent implements OnInit, ControlValueAccessor {
  @ViewChild('el')
  el: ElementRef;
  @Input()
  name: string;
  @Input()
  value: any;
  @Input()
  label: string;
  @Input()
  size: 'large' | 'default' | 'small' | 'mini' = 'default';
  @Input()
  required: boolean;
  @Input()
  disabled: boolean;
  @Output()
  checkChange: EventEmitter<any> = new EventEmitter();
  model: any;
  focus: boolean;
  checked: boolean;
  private onChangedCallback: (_) => void;
  private onTouchedCallback: () => void;
  constructor() { }

  ngOnInit() {
  }
  writeValue(obj: any): void {
    this.model = !obj && this.model ? null : (obj && this.model !== obj ? obj : this.model);
    this.getModelCheck();
  }
  registerOnChange(fn: any): void {
    this.onChangedCallback = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouchedCallback = fn;
  }

  onFocus() {
    this.focus = true;
  }
  onBlur() {
    this.focus = false;
    if (this.onTouchedCallback) {
      this.onTouchedCallback();
    }
  }

  onSelectRadio(event) {
    if (!this.disabled) {
      this.el.nativeElement.focus();
      if (this.model !== this.value) {
        this.model = this.value;
        if (this.onChangedCallback) {
          this.onChangedCallback(this.value);
        }
        this.checkChange.emit(this.value);
        this.getModelCheck();
      }
    }
  }

  private getModelCheck() {
    // tslint:disable-next-line:triple-equals
    this.checked = this.model == this.value;
  }
}
