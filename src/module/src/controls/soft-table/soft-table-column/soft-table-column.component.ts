import { Component, OnInit, Input, ContentChild, TemplateRef, ContentChildren, QueryList } from '@angular/core';

@Component({
  selector: 'soft-table-column',
  template: '<ng-content></ng-content>'
})
export class SoftTableColumnComponent implements OnInit {
  @Input()
  key: string | string[];
  @Input()
  label: string;
  @Input()
  width: string;
  @Input()
  align: 'left' | 'center' | 'right' = 'center';
  @Input()
  sortable: boolean;
  @Input()
  show: boolean = true;
  @Input()
  summary: string | string[];
  @Input()
  summaryDependency: Array<string | string[]>;
  @ContentChild('label')
  labelTemplate: TemplateRef<any>;
  @ContentChild('col')
  colTemplate: TemplateRef<any>;
  @ContentChildren(SoftTableColumnComponent)
  subColumns: QueryList<SoftTableColumnComponent>;
  children: Array<SoftTableColumnComponent>;
  currentLevel: number;
  maxLevel: number;
  constructor() { }

  ngOnInit() {
  }

  getMaxLevel() {
    if (!this.children || !this.children.length) {
      return this.currentLevel;
    } else {
      let max = this.currentLevel;
      this.children.map(c => {
        const subLevel = c.getMaxLevel();
        max = max < subLevel ? subLevel : max;
      });
      return max;
    }
  }
}
