<soft-table [list]="list">
  <soft-table-column [label]="'Id'" [key]="'Id'"></soft-table-column>
  <soft-table-column [label]="'Name'" [key]="'Name'"></soft-table-column>
  <soft-table-column [label]="'Age'" [key]="'Age'"></soft-table-column>
  <soft-table-column [label]="'Address'" key="Address">
    <soft-table-column [label]="'Add1'" key="Address1"></soft-table-column>
    <soft-table-column label="Add2" key="Address2"></soft-table-column>
  </soft-table-column>
</soft-table>