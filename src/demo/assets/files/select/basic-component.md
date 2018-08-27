export class SelectComponent implements OnInit {
  selectModel: any;
  list: Array<any>;

  constructor() { }

  ngOnInit() {
    this.list = [];
    for (let i = 0; i < 9; i++) {
      this.list.push({
        id: i,
        text: 'Option' + i
      });
    }
  }
}
