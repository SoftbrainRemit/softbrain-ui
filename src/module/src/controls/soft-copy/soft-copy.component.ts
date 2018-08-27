import { SoftCopyService } from './../../services/soft-copy.service';
import { Component, OnInit, Input, ContentChild, TemplateRef } from '@angular/core';

@Component({
  selector: 'soft-copy',
  templateUrl: './soft-copy.component.html',
  styleUrls: ['./soft-copy.component.scss']
})
export class SoftCopyComponent implements OnInit {
  @Input()
  data: any;
  @ContentChild('title')
  titleTemplate: TemplateRef<any>;

  constructor(
    private copyService: SoftCopyService
  ) { }

  ngOnInit() {
  }

  copy() {
    this.copyService.copy(this.data);
  }
}
