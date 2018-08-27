import { SoftPager } from './../../../../../module/src/models/soft-pager';
import { Component, OnInit } from '@angular/core';
import { SoftPagerService } from './../../../../../module/src/services/soft-pager.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  list: Array<any>;
  pager: SoftPager;
  constructor(
    private pagerService: SoftPagerService
  ) {
    this.pager = this.pagerService.initPager();
    this.pager.total = 97;
  }

  ngOnInit() {
    this.list = [{
      Id: 1,
      Name: '张三',
      Age: 20
    }, {
      Id: 2,
      Name: '李四',
      Age: 25
    }, {
      Id: 3,
      Name: '王五',
      Age: 30
    }];
  }
  getRowClassName(data, index) {
    if (data.Age >= 25) {
      return 'bg-primary';
    }
    return '';
  }
}
