export class MenuComponent implements OnInit {
  menus: Array<SoftMenuItem>;
  isCollapse: boolean = false;

  constructor() {
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
