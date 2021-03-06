import { SoftDialogRef } from './../../../../../module/src/services/soft-dialog-ref';
import { SoftDialogService } from './../../../../../module/src/services/soft-dialog.service';
import { Component, OnInit, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  eventList: Array<string> = [];
  tmp1Ref: SoftDialogRef;
  constructor(
    private dialogService: SoftDialogService
  ) { }

  ngOnInit() {
  }

  showDialog() {
    this.eventList = [];
    const ref = this.dialogService.show('Success', {
      class: 'soft-dialog-large'
    });
    ref.onBeforeShow.subscribe(() => {
      this.eventList.push('This is Before Show');
    });
    ref.onAfterShow.subscribe(() => {
      this.eventList.push('This is After Show');
    });
    ref.onBeforeHide.subscribe(() => {
      this.eventList.push('This is Before Hide');
    });
    ref.onAfterHide.subscribe(() => {
      this.eventList.push('This is After Hide');
    });
  }

  showTemplate(tmp: TemplateRef<any>) {
    this.tmp1Ref = this.dialogService.show(tmp);
  }
  showTmp2(tmp: any) {
    this.dialogService.show(tmp);
  }
}
