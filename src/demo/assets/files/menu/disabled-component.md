export class MenuComponent implements OnInit {
  disabledMenu: Array<SoftMenuItem>;

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
  }

  ngOnInit() {
  }
}
