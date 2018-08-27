export class SelectComponent implements OnInit {
  minInputModel: any;

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

  onAjax(event) {
    setTimeout(() => {
      event.success(this.list);
    }, 1000);
  }

}
