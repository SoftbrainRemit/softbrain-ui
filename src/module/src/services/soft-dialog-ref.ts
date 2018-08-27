import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class SoftDialogRef {
    onBeforeShow: EventEmitter<any> = new EventEmitter();
    onAfterShow: EventEmitter<any> = new EventEmitter();
    onBeforeHide: EventEmitter<any> = new EventEmitter();
    onAfterHide: EventEmitter<any> = new EventEmitter();

    hide: Function;
}
