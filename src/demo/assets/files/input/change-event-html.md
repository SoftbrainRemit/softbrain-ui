<soft-input placeholder="Change Event" [(ngModel)]="changeModel" (valueChange)="onChange($event)"></soft-input>
<div>
  {{changeValue | json}}
</div>