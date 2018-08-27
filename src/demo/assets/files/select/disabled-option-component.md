export class SelectComponent implements OnInit {
  disabledOptionModel: any;
  listWithDisabled: Array<any>;

  constructor() { }

  ngOnInit() {
    this.listWithDisabled = [];
    for (let i = 0; i < 9; i++) {
      this.listWithDisabled.push({
        id: i,
        text: 'Option' + i,
        disabled: i < 3
      });
    }
  }
}
