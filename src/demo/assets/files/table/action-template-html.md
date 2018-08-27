<soft-table [list]="list" [hasAction]="true" actionLabel="Action" actionWidth="150px">
  <soft-table-column [label]="'Id'" [key]="'Id'"></soft-table-column>
  <soft-table-column [label]="'Name'" [key]="'Name'"></soft-table-column>
  <soft-table-column [label]="'Age'" [key]="'Age'"></soft-table-column>
  <soft-table-column [label]="'Address'" key="Address"></soft-table-column>
  <ng-template #action let-item="item">
    <soft-button [size]="'mini'">Edit</soft-button>
    <soft-button size="mini" [color]="'danger'">Remove</soft-button>
  </ng-template>
</soft-table>