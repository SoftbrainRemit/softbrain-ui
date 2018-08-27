import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {
  requiredModel: any;
  selectModel: any;
  ajaxModel: any;
  disabledOptionModel: any;
  templateModel: any;
  minInputModel: any;
  searchingTextModel: any;
  defaultSelectModel: any = 2;
  customModel: any;

  list: Array<any>;
  listWithDisabled: Array<any>;
  customList: Array<any>;

  constructor() { }

  ngOnInit() {
    this.list = [];
    for (let i = 0; i < 9; i++) {
      this.list.push({
        id: i,
        text: 'Option' + i
      });
    }
    this.listWithDisabled = [];
    for (let i = 0; i < 9; i++) {
      this.listWithDisabled.push({
        id: i,
        text: 'Option' + i,
        disabled: i < 3
      });
    }
    this.customList = [];
    for (let i = 0; i < 9; i++) {
      this.customList.push({
        ListId: i,
        ListDisplay: 'Option ' + i
      });
    }
  }

  onAjax(event) {
    setTimeout(() => {
      event.success(this.list);
    }, 1000);
  }

  onCustomAjax(event) {
    setTimeout(() => {
      event.success(this.customList);
    }, 1000);
  }
}
