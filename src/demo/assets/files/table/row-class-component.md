export class TableComponent implements OnInit {
  list: Array<any>;
  constructor(
  ) {
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
