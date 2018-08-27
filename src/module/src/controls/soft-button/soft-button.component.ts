import { Component, OnInit, Input, ContentChild, TemplateRef, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'soft-button',
  templateUrl: './soft-button.component.html',
  styleUrls: ['./soft-button.component.scss']
})
export class SoftButtonComponent implements OnInit {
  @Input()
  type: 'submit' | 'button' = 'button';
  @Input()
  size: 'large' | 'default' | 'small' | 'mini' = 'default';
  @Input()
  color: 'primary' | 'danger' | 'success' | 'warning' = 'primary';
  @Input()
  disabled: boolean;
  @Input()
  loading: boolean;
  @Output()
  click: EventEmitter<any> = new EventEmitter();

  focus: boolean;
  constructor() { }

  ngOnInit() {
  }

  onFocus() {
    this.focus = true;
  }
  onBlur() {
    this.focus = false;
  }
  onClick(event: Event) {
    event.stopPropagation();
    if (!this.disabled && !this.loading) {
      this.click.emit();
    }
  }
}
