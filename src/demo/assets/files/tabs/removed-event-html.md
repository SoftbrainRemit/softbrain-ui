<soft-tabs [justify]="true">
  <tab *ngFor="let t of tabs" [title]="t.title" [removable]="t.removable" (removed)="onRemovable(t)">
    {{t.content}}
  </tab>
</soft-tabs>