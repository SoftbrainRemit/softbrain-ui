import {
  Component, OnInit, Input, Output, EventEmitter, TemplateRef, ViewChild, OnChanges,
  SimpleChanges, AfterViewInit
} from '@angular/core';

@Component({
  selector: 'soft-pagination',
  templateUrl: './soft-pagination.component.html',
  styleUrls: ['./soft-pagination.component.scss']
})
export class SoftPaginationComponent implements OnInit, OnChanges, AfterViewInit {
  @Input()
  total: number;
  @Input()
  pageSize: number = 10;
  @Input()
  totalPageTitle: string;
  @Input()
  currentPage: number;
  @Input()
  pageNumbersInPage: number = 10;
  @Input()
  prevText: string;
  @Input()
  firstText: string;
  @Input()
  nextText: string;
  @Input()
  lastText: string;
  @Input()
  layout: 'left-right' | 'left' | 'right' = 'left-right';
  // @Input()
  // layout: Array<'prev' | 'pager' | 'next' | 'size' | 'jumper' | 'total'> = ['prev', 'pager', 'next'];
  @Output()
  pageChanged: EventEmitter<any> = new EventEmitter();
  // @Output()
  // pageSizeChanged: EventEmitter<any> = new EventEmitter();

  @ViewChild('prev')
  prevTemplate: TemplateRef<any>;
  @ViewChild('pager')
  pagerTemplate: TemplateRef<any>;
  @ViewChild('next')
  nextTemplate: TemplateRef<any>;
  @ViewChild('size')
  sizeTemplate: TemplateRef<any>;
  @ViewChild('jumper')
  jumperTemplate: TemplateRef<any>;
  @ViewChild('total')
  totalTemplate: TemplateRef<any>;

  turnToPage: number;
  templateMap: { [key: string]: TemplateRef<any> } = {};
  maxPage: number;
  pageList: Array<any>;
  fromPage: number;
  endPage: number;
  totalFormat: string;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    const change = changes['total'];
    const psChange = changes['pageSize'];
    if (change || psChange) {
      this.calcMaxPage();
      this.initPageList();
    }
  }

  ngAfterViewInit() {
    this.templateMap = {
      prev: this.prevTemplate,
      pager: this.pagerTemplate,
      next: this.nextTemplate,
      size: this.sizeTemplate,
      jumper: this.jumperTemplate,
      total: this.totalTemplate
    };
  }

  onPageChanged(page: number) {
    if (page) {
      if (page > this.maxPage) {
        page = this.maxPage;
      }
      if (page <= 0) {
        page = 1;
      }
      if (this.currentPage === page) {
        return;
      }
      this.currentPage = page;
      this.pageChanged.emit({ page: this.currentPage });
      this.initPageList();
    }
  }

  // onSizeKeyPress(event) {
  //   if (event.keyCode === 13) {
  //     this.onPageChanged(this.turnToPage);
  //   }
  // }

  // onPageSizeChange(event) {
  //   this.pageSize = event - 0;
  //   this.pageSizeChanged.emit(this.pageSize);
  // }

  private format(str: string, ...paramList: any[]) {
    if (paramList.length === 0) {
      return str;
    }
    let s = str;
    for (let i = 0; i < paramList.length; i++) {
      s = s.replace(new RegExp('\\{' + i + '\\}', 'g'), paramList[i]);
    }
    return s;
  }

  private calcMaxPage() {
    if (this.pageSize > 0) {
      this.maxPage = (Math.floor(((this.total || 0) + this.pageSize - 1) / this.pageSize) || 1);
    } else {
      this.maxPage = 1;
    }
    if (this.currentPage > this.maxPage) {
      this.currentPage = this.maxPage;
      this.onPageChanged(this.currentPage);
    }
  }

  private initPageList() {
    this.pageList = [];
    if (this.pageSize > 0) {
      let firstPageNumber = this.currentPage - Math.floor(this.pageNumbersInPage / 2);
      firstPageNumber = firstPageNumber < 1 ? 1 : firstPageNumber;
      let lastPageNumber = this.currentPage + Math.floor(this.pageNumbersInPage / 2 - 1);
      lastPageNumber = lastPageNumber > this.maxPage ? this.maxPage : lastPageNumber;

      let totalPages = lastPageNumber - firstPageNumber + 1;
      if (totalPages < this.pageNumbersInPage && firstPageNumber > 1) {
        firstPageNumber = firstPageNumber - (this.pageNumbersInPage - totalPages);
        firstPageNumber = firstPageNumber < 1 ? 1 : firstPageNumber;
        totalPages = lastPageNumber - firstPageNumber + 1;
      }

      if (totalPages < this.pageNumbersInPage && lastPageNumber < this.maxPage) {
        lastPageNumber = lastPageNumber + (this.pageNumbersInPage - totalPages);
        lastPageNumber = lastPageNumber > this.maxPage ? this.maxPage : lastPageNumber;
      }

      for (let i = firstPageNumber; i <= lastPageNumber; i++) {
        this.pageList.push(i);
      }
    } else {
      this.pageList.push(1);
    }
    this.formatTotal();
  }

  private formatTotal() {
    if (this.totalPageTitle && this.total && this.currentPage) {
      this.fromPage = (this.currentPage - 1) * this.pageSize + 1;
      this.endPage = this.currentPage * this.pageSize;
      if (this.fromPage <= 0) {
        this.fromPage = 1;
      }
      if (this.endPage > this.total) {
        this.endPage = this.total;
      }
      this.totalFormat = this.format(this.totalPageTitle, this.fromPage, this.endPage, this.total);
    }
  }
}
