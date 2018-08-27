export class TabsComponent implements OnInit {
  tabs: Array<any>;

  constructor() { }

  ngOnInit() {
    this.tabs = [];
    for (let i = 0; i < 10; i++) {
      this.tabs.push({
        title: 'Tab - ' + i,
        content: 'Tab - content - ' + i,
        removable: i > 0
      });
    }
  }

  onSelect(t: any) {
    console.log(t);
  }

}
