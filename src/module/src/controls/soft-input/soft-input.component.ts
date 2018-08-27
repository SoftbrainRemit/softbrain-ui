import { element } from 'protractor';
import {
  Component, OnInit, Input, forwardRef, ContentChild, TemplateRef, Output, EventEmitter,
  ViewChild, ElementRef
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

export const SoftInputValueAccessor: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SoftInputComponent),
  multi: true
};

@Component({
  selector: 'soft-input',
  templateUrl: './soft-input.component.html',
  styleUrls: ['./soft-input.component.scss'],
  providers: [SoftInputValueAccessor]
})
export class SoftInputComponent implements OnInit, ControlValueAccessor {
  @ViewChild('input')
  inputElement: ElementRef;
  @ViewChild('textarea')
  textareaElement: ElementRef;
  @Input()
  type: 'text' | 'number' | 'textarea' | 'password' = 'text';
  @Input()
  name: string;
  @Input()
  required: boolean;
  @Input()
  maxLength: number;
  @Input()
  minLength: number;
  @Input()
  placeholder: string = '';
  @Input()
  disabled: boolean;
  @Input()
  readonly: boolean;
  @Input()
  autoComplete: 'on' | 'off' = 'off';
  @Input()
  size: 'large' | 'small' | 'mini';
  @Input()
  autoSize: boolean;
  @Input()
  autoFocus: boolean;
  @ContentChild('prepend')
  prependTemplate: TemplateRef<any>;
  @ContentChild('append')
  appendTemplate: TemplateRef<any>;
  @Output()
  valueChange: EventEmitter<any> = new EventEmitter();
  @Output()
  valueInput: EventEmitter<any> = new EventEmitter();
  @Output()
  inputClick: EventEmitter<any> = new EventEmitter();
  model: any;

  inputFocus: boolean;

  private onChangedCallback: (_) => void;
  private onTouchedCallback: () => void;

  constructor() { }

  ngOnInit() {
  }
  writeValue(obj: any): void {
    this.model = !obj && this.model ? null : (obj && this.model !== obj ? obj : this.model);
  }
  registerOnChange(fn: any): void {
    this.onChangedCallback = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouchedCallback = fn;
  }

  onFocus() {
    this.inputFocus = true;
  }

  onBlur() {
    this.inputFocus = false;
    if (this.onTouchedCallback) {
      this.onTouchedCallback();
    }
  }

  onValueChange(event) {
    const value = event.target.value;
    if (this.onChangedCallback) {
      this.onChangedCallback(value);
    }
    if (this.onTouchedCallback) {
      this.onTouchedCallback();
    }
    this.valueChange.emit(value);
  }

  onValueInput(event) {
    const value = event.target.value;
    if (this.onChangedCallback) {
      this.onChangedCallback(value);
    }
    if (this.onTouchedCallback) {
      this.onTouchedCallback();
    }
    this.valueInput.emit(value);
  }

  onClick(event) {
    this.inputClick.emit(event);
  }
}
