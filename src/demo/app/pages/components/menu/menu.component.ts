import { SoftMenuItem } from './../../../../../module/src/models/soft-menu.interface';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  menus: Array<SoftMenuItem>;
  disabledMenu: Array<SoftMenuItem>;
  isCollapse: boolean = false;

  constructor() {
    this.disabledMenu = [{
      label: 'Index',
      index: '1',
      show: true,
      icon: 'fa fa-fw fa-dashboard'
    }, {
      label: 'Components',
      index: '2',
      show: true,
      icon: 'fa fa-fw fa-dashboard',
      children: [{
        label: 'label1',
        index: '2-1',
        show: true,
        icon: 'fa fa-fw fa-dashboard'
      }, {
        label: 'label2',
        index: '2-2',
        show: true,
        icon: 'fa fa-fw fa-dashboard',
        disabled: true
      }]
    }, {
      label: 'Third',
      index: '3',
      show: true,
      icon: 'fa fa-fw fa-dashboard'
    }];
    this.menus = [{
      label: 'Index',
      index: '1',
      show: true,
      icon: 'fa fa-fw fa-dashboard'
    }, {
      label: 'Components',
      index: '2',
      show: true,
      icon: 'fa fa-fw fa-dashboard',
      children: [{
        label: 'label1',
        index: '2-1',
        show: true,
        icon: 'fa fa-fw fa-dashboard'
      }, {
        label: 'label2',
        index: '2-2',
        show: true,
        icon: 'fa fa-fw fa-dashboard'
      }]
    }, {
      label: 'Third',
      index: '3',
      show: true,
      icon: 'fa fa-fw fa-dashboard'
    }];
  }

  ngOnInit() {
  }

  onCollapse() {
    this.isCollapse = !this.isCollapse;
  }
}
