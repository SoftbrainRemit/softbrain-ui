export class InputComponent implements OnInit {
  inputModel: any;
  constructor() { }

  ngOnInit() {
  }

  onInput(event) {
    console.log('This is input event');
  }
}
