<soft-table [list]="list">
  <ng-template #subtitle>
    <soft-button>Add</soft-button>
  </ng-template>
  <soft-table-column [label]="'Id'" [key]="'Id'"></soft-table-column>
  <soft-table-column [label]="'Name'" [key]="'Name'" [sortable]="true"></soft-table-column>
  <soft-table-column [label]="'Age'" [summary]="'Age'" [key]="'Age'"></soft-table-column>
</soft-table>