import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {
  basicModel: any;
  lengthModel: any;
  requireModel: any;
  model: any = 'Disabled';
  readonlyModel: string = 'I am readonly value';
  changeModel: any;
  changeValue: any;
  inputModel: any;
  clickModel: any;
  constructor() { }

  ngOnInit() {
  }

  onChange(event) {
    this.changeValue = event;
  }

  onInput(event) {
    console.log('This is input event');
  }
  onClick(event) {
    console.log('This is click event');
  }
}
