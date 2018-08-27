import { SoftStepItem } from './../../models/soft-step-item';
import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'soft-steps',
  templateUrl: './soft-steps.component.html',
  styleUrls: ['./soft-steps.component.scss']
})
export class SoftStepsComponent implements OnInit, OnChanges {
  @Input()
  steps: SoftStepItem[];
  @Input()
  selectable: boolean;
  @Input()
  activeIndex: number = 0;
  @Output()
  activeIndexChange: EventEmitter<any> = new EventEmitter();

  @Output()
  stepChange: EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    const change = changes['activeIndex'];
    if (change && change.previousValue !== change.currentValue) {
      this.stepChange.emit(change.currentValue);
    }
  }

  onSelectStep(step: SoftStepItem) {
    this.activeIndex = this.steps.indexOf(step);
    this.activeIndexChange.emit(this.activeIndex);
    this.stepChange.emit(step);
  }
}
