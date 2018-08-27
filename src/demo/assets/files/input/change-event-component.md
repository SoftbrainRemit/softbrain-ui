export class InputComponent implements OnInit {
  changeModel: any;
  changeValue: any;

  constructor() { }

  ngOnInit() {
  }

  onChange(event) {
    this.changeValue = event;
  }
}
