<soft-table [list]="list">
  <ng-template #pagerTemplate>
    <soft-pagination [currentPage]="pager.currentPage" [pageSize]="pager.pageSize" [total]="pager.total" [layout]="'left-right'" [prevText]="'上一页'" [firstText]="'第一页'"
      [nextText]="'下一页'" [lastText]="'最后一页'" [totalPageTitle]="'共 {2} 条 本页显示第 {0} 到 {1} 条'"></soft-pagination>
  </ng-template>
  <ng-template #footer>
    <soft-button size="small" color="success">Footer</soft-button>
  </ng-template>
  <soft-table-column [label]="'Id'" [key]="'Id'"></soft-table-column>
  <soft-table-column [label]="'Name'" [key]="'Name'" [sortable]="true"></soft-table-column>
  <soft-table-column [label]="'Age'" [summary]="'Age'" [key]="'Age'"></soft-table-column>
</soft-table>