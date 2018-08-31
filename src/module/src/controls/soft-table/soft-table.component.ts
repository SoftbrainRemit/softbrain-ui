import {
  Component, Input, EventEmitter, Output, TemplateRef, ContentChild, ContentChildren,
  QueryList, AfterViewInit, ChangeDetectorRef, SimpleChanges, OnChanges, ViewChild, ElementRef
} from '@angular/core';
import { SoftTableColumnComponent } from './soft-table-column/soft-table-column.component';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/debounceTime';

@Component({
  selector: 'soft-table',
  templateUrl: './soft-table.component.html',
  styleUrls: ['./soft-table.component.scss']
})
export class SoftTableComponent implements OnChanges, AfterViewInit {
  @ViewChild('table')
  tableElement: ElementRef;
  @ViewChild('parent')
  parentElement: ElementRef;
  @ViewChild('root')
  root: ElementRef;
  @Input()
  title: string;
  @Input()
  hasAction: boolean;
  @Input()
  hasCheckbox: boolean;
  @Input()
  actionLabel: string;
  @Input()
  actionWidth: string;
  @Input()
  list: Array<any>;
  @Input()
  hasSummary: boolean;
  @Input()
  totalLabel: string;
  @Input()
  sort: any;
  @Input()
  rowClassName: (item: any, index: number) => string;
  @Output()
  sortChange: EventEmitter<any> = new EventEmitter();
  @Output()
  rowClick: EventEmitter<any> = new EventEmitter();
  @ContentChild('action')
  actionTemplate: TemplateRef<any>;
  @ContentChild('footer')
  footerTemplate: TemplateRef<any>;
  @ContentChild('subtitle')
  subtitleTemplate: TemplateRef<any>;
  @ContentChild('pagerTemplate')
  pagerTemplate: TemplateRef<any>;

  @ContentChildren(SoftTableColumnComponent)
  viewColumns: QueryList<SoftTableColumnComponent>;
  columns: Array<SoftTableColumnComponent> = [];
  deepColumns: Array<SoftTableColumnComponent> = [];
  summary: any;
  checkAll: boolean;
  maxLevel: number = 1;
  headerLevels: number[];
  sortField: { key?: string, orderBy?: 'ASC' | 'DESC' } = { orderBy: 'DESC' };
  constructor(
    private changeDetectorRef: ChangeDetectorRef,
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    const change = changes['list'];
    if (change) {
      if (this.hasSummary) {
        this.updateSummary(change.currentValue);
      }
    }
  }
  ngAfterViewInit() {
    const docEl = document.documentElement;
    this.parentElement.nativeElement.style.width = this.parentElement.nativeElement.offsetWidth + 'px';
    this.tableElement.nativeElement.style.display = 'table';
    const columns = this.getColumns();
    this.deepColumns = this.getDeepColumns(columns);
    this.columns = this.platColumns(columns);
    this.maxLevel = this.getMaxLevel(columns);
    this.headerLevels = this.headerLevels || [];
    while (this.headerLevels.length < this.maxLevel) {
      this.headerLevels.push(this.headerLevels.length + 1);
    }
    this.updateSummary(this.list);
    this.changeDetectorRef.markForCheck();
    this.changeDetectorRef.detectChanges();
  }

  onSelectAll(event) {
    this.checkAll = event;
    if (this.list) {
      this.list.map(item => {
        item.checked = this.checkAll;
      });
    }
  }
  onCheckedItem(item: any, event: any) {
    this.checkAll = true;
    if (this.list && this.list.length) {
      for (let i = 0; i < this.list.length; i++) {
        if (!this.list[i].checked) {
          this.checkAll = false;
          break;
        }
      }
    }
  }
  getData(key: string | string[], item: any) {
    // console.log(item);
    if (!item || !key) { return ''; }
    if (key instanceof Array) {
      let i = 0;
      let model = item;
      while (i < key.length && model) {
        model = model[key[i++]] || '';
      }
      return model;
    }

    return item[key];
  }

  getTableThStyle(trEl: any) {

  }

  isFixWidth(col: SoftTableColumnComponent) {
    const reg = /%$/ig;
    if (col.width && !reg.test(col.width)) {
      return true;
    }
    return false;
  }
  private getSubColumns(col: SoftTableColumnComponent) {
    if (col.subColumns && col.subColumns.length > 1) {
      col.children = col.children || [];
      col.subColumns.map(d => {
        if (d === col.subColumns.first) { return; }
        col.children.push(d);
        this.getSubColumns(d);
      });
    }
  }

  private setColumnLevel(col: SoftTableColumnComponent, level: number = 1): number {
    let max = level;
    col.currentLevel = level;
    if (col.children && col.children.length) {
      for (let i = 0; i < col.children.length; i++) {
        const res = this.setColumnLevel(col.children[i], level + 1);
        max = max < res ? res : max;
      }
    }
    col.maxLevel = max;
    return max;
  }

  private getDeepColumns(columns: SoftTableColumnComponent[]) {
    const deeps = [];
    for (let i = 0; i < columns.length; i++) {
      if (!columns[i].children || !columns[i].children.length) {
        deeps.push(columns[i]);
      } else {
        const children = this.getDeepColumns(columns[i].children);
        deeps.push(...children);
      }
    }
    return deeps;
  }

  private getColumns() {
    const columns = [];
    if (this.viewColumns) {
      this.viewColumns.map(c => {
        this.getSubColumns(c);
        columns.push(c);
      });
    }
    // 设置每个层级的level;
    for (let i = 0; i < columns.length; i++) {
      this.setColumnLevel(columns[i]);
    }
    return columns;
  }

  private getMaxLevel(columns: Array<SoftTableColumnComponent>) {
    let maxLevel = 1;
    for (let i = 0; i < columns.length; i++) {
      const max = columns[i].getMaxLevel();
      maxLevel = maxLevel < max ? max : maxLevel;
    }
    return maxLevel;
  }

  private platColumns(columns: Array<SoftTableColumnComponent>) {
    const result = [];
    if (columns) {
      columns.map(d => {
        result.push(d);
        if (d.children && d.children.length) {
          const children = this.platColumns(d.children);
          result.push(...children);
        }
      });
    }
    return result;
  }

  private updateSummary(list: Array<any>) {
    if (!this.hasSummary) { return; }
    if (this.deepColumns && list) {
      const summary: any = {};
      this.deepColumns.map(c => {
        if (!c.summary) { return; }
        let result: any = 0;
        result = list.map(item => {
          return this.getData(c.summary, item) || 0;
        }).reduce((p, n, i, array) => p + n) || 0;
        this.setFieldValue(summary, c.summary, result);
        if (c.summaryDependency) {
          c.summaryDependency.map(d => {
            const item = list[0];
            this.setFieldValue(summary, d, this.getData(d, item));
          });
        }
      });
      this.summary = summary;
    } else {
      this.summary = {};
    }
    console.log(this.summary);
  }

  private setFieldValue(obj: any, field: string | string[], value: any) {
    if (field instanceof Array) {
      let tmp = obj;
      let i = 0;
      while (i < field.length - 1) {
        tmp[field[i]] = tmp[field[i]] || {};
        tmp = tmp[field[i]];
        i++;
      }
      tmp[field[i]] = value;
    } else {
      obj[field] = value;
    }
  }

  equalsKey(key: string | string[], dir: string) {
    if (key instanceof Array && key.length > 0) {
      key = key[key.length - 1];
    }
    return (this.sortField.orderBy !== dir && this.sortField.key === key) || this.sortField.key !== key;
  }
  onSortChange(col: SoftTableColumnComponent) {
    if (!col.sortable) {
      return;
    }
    let key: any = col.key;
    if (col.key instanceof Array) {
      if (col.key.length > 0) {
        key = col.key[col.key.length - 1];
      }
    } else {
      key = col.key;
    }
    // 如果是同一key上单击，更改排序方式，否则，默认排序方式
    if (this.sortField.key === key) {
      this.sortField.orderBy = this.sortField.orderBy === 'DESC' ? 'ASC' : 'DESC';
    } else {
      this.sortField.key = key;
      this.sortField.orderBy = 'DESC';
    }
    this.sortChange.emit(this.sortField);
  }

  getTrClass(tableRow: any, item: any, index: number) {
    const css: any = {};
    const customClassName = this.rowClassName ? this.rowClassName(item, index) : '';
    if (tableRow.hover) {
      css['hover-row'] = true;
    } else if (customClassName) {
      css[customClassName] = true;
    } else if (index % 2 === 0) {
      css['odd'] = true;
    }
    return css;
  }
}
