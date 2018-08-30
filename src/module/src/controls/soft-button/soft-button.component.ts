import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

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
}
