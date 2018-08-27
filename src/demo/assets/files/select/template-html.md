<soft-select placeholder="My Select" [(ngModel)]="templateModel" [items]="list">
    <ng-template #format let-item="item">
        {{item.id}} - <span class="text-danger">{{item.text}}</span>
    </ng-template>
</soft-select>