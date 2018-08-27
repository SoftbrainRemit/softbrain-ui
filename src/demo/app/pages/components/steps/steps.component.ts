import { SoftStepItem } from './../../../../../module/src/models/soft-step-item';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-steps',
  templateUrl: './steps.component.html',
  styleUrls: ['./steps.component.scss']
})
export class StepsComponent implements OnInit {
  activeIndex: number = 0;
  steps: Array<SoftStepItem>;

  constructor() {
    this.steps = [{
      label: 'Step1',
      description: 'This is a long step description'
    }, {
      label: 'Step2',
      description: 'This is a long step description'
    }, {
      label: 'Step3',
      description: 'This is a long step description'
    }];
  }

  ngOnInit() {
  }

  pre() {
    this.activeIndex--;
  }
  next() {
    this.activeIndex++;
  }
}
