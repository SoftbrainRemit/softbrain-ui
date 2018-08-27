import { SoftDialogContainerComponent } from './../controls/soft-dialog/soft-dialog-container.component';
import { SoftDialogRef } from './../services/soft-dialog-ref';
import { ComponentRef } from '@angular/core';

export class SoftContentRef {
    dialogRef: SoftDialogRef;
    componentRef: ComponentRef<any>;
    instance: SoftDialogContainerComponent;

    constructor(dialogRef: SoftDialogRef, componentRef: ComponentRef<any>) {
        this.dialogRef = dialogRef;
        this.componentRef = componentRef;
    }
}
