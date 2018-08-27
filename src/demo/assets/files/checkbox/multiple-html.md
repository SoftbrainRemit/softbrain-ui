<soft-checkbox [multiple]="true" [(ngModel)]="groupModel" [value]="1" [label]="'Value1'"></soft-checkbox>
<soft-checkbox [multiple]="true" [(ngModel)]="groupModel" [value]="2" [label]="'Value2'"></soft-checkbox>
<soft-checkbox [multiple]="true" [(ngModel)]="groupModel" [value]="3" [label]="'Value3'"></soft-checkbox>
<div>
  {{groupModel | json}}
</div>