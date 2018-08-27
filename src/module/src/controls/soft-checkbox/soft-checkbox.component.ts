import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { Component, OnInit, Input, forwardRef, ViewChild, ElementRef, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';

export const SoftCheckedValueAccessor: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SoftCheckboxComponent),
  multi: true
};

@Component({
  selector: 'soft-checkbox',
  templateUrl: './soft-checkbox.component.html',
  styleUrls: ['./soft-checkbox.component.scss'],
  providers: [SoftCheckedValueAccessor]
})
export class SoftCheckboxComponent implements OnInit, ControlValueAccessor {
  @ViewChild('checkbox')
  checkboxElement: ElementRef;
  @Input()
  name: string;
  @Input()
  multiple: boolean;
  @Input()
  value: any;
  @Input()
  label: string;
  @Input()
  size: 'large' | 'default' | 'small' | 'mini' = 'default';
  @Input()
  disabled: boolean;
  @Output()
  changeChecked: EventEmitter<any> = new EventEmitter();
  model: any;
  focus: boolean;
  checked: boolean;
  private onChangedCallback: (_) => void;
  private onTouchedCallback: () => void;
  constructor(
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit() {
  }

  writeValue(obj: any): void {
    if (!obj) {
      if (this.model) {
        if (this.multiple) {
          this.model = [];
        } else {
          this.model = false;
        }
      }
    } else {
      if (obj !== this.model) {
        this.model = obj;
      }
    }
    this.onModelChecked();
  }
  registerOnChange(fn: any): void {
    this.onChangedCallback = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouchedCallback = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onClick(event: Event) {
    if (!this.disabled) {
      this.toggleModel();
      this.checkboxElement.nativeElement.focus();
    }
    event.stopPropagation();
  }

  onFocus(event) {
    this.focus = true;
  }

  onBlur(event) {
    this.focus = false;
  }

  onModelChecked() {
    if (this.multiple) {
      if (this.model instanceof Array) {
        this.checked = (this.model || []).indexOf(this.value) >= 0;
      } else {
        this.checked = false;
      }
    } else {
      this.checked = this.model;
    }
  }

  private toggleModel() {
    if (this.multiple) {
      this.model = this.model || [];
      if (this.model instanceof Array) {
      } else {
        this.model = [this.model];
      }
      const index = this.model.indexOf(this.value);
      if (index >= 0) {
        this.model.splice(index, 1);
      } else {
        this.model.push(this.value);
      }
    } else {
      this.model = !this.model;
    }
    if (this.onChangedCallback) {
      this.onChangedCallback(this.model);
    }
    if (this.onTouchedCallback) {
      this.onTouchedCallback();
    }
    this.onModelChecked();
    this.changeChecked.emit(this.multiple ? this.value : this.model);
  }
}
