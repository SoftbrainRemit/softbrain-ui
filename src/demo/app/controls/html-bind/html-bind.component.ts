import { FileFetcherService } from './../../services/file-fetcher.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'html-bind',
  templateUrl: './html-bind.component.html',
  styleUrls: ['./html-bind.component.scss'],
})
export class HtmlBindComponent implements OnInit {
  @Input()
  url: string;
  @Input()
  language: string;

  data: string;

  constructor(
    private fileService: FileFetcherService
  ) {
  }

  ngOnInit() {
    this.fileService.getFile(this.url).subscribe(data => {
      this.data = data;
    });
  }
}
