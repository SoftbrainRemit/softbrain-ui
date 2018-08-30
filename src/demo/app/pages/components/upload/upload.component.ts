import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  msgs: string[] = [];

  constructor() { }

  ngOnInit() {
  }

  onComplete(e) {
    console.log(e);
  }

  onerror(e) {
    console.log(e);
  }
}
