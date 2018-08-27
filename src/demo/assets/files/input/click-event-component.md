export class InputComponent implements OnInit {
  clickModel: any;
  constructor() { }

  ngOnInit() {
  }

  onClick(event) {
    console.log('This is click event');
  }
}
