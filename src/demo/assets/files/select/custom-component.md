import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {
  customModel: any;

  customList: Array<any>;

  constructor() { }

  ngOnInit() {
    this.customList = [];
    for (let i = 0; i < 9; i++) {
      this.customList.push({
        ListId: i,
        ListDisplay: 'Option ' + i
      });
    }
  }

  onCustomAjax(event) {
    setTimeout(() => {
      event.success(this.customList);
    }, 1000);
  }
}
