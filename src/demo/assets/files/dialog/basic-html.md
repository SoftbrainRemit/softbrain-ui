<soft-button (click)="showDialog()">Show Dialog</soft-button>
<ul>
  <li *ngFor="let msg of eventList">
    {{msg}}
  </li>
</ul>

<soft-button (click)="showTemplate(tmp)">Show Template</soft-button>
<ng-template #tmp>
  <div class="dialog">
    <div class="dialog-header">
      Message Show
    </div>
    <div class="dialog-body">
      <div>
        This is First Dialog
      </div>
      <div>
        <soft-button (click)="showTmp2(tmp2)">Show Second Dialog</soft-button>
      </div>
    </div>
  </div>
</ng-template>

<ng-template #tmp2>
  <div class="dialog">
    <div class="dialog-header">
      Second Dialog
    </div>
    <div class="dialog-body">
      This is Second Dialog
    </div>
  </div>
</ng-template>