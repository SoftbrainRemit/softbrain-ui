import { SoftDialogRef } from './../../services/soft-dialog-ref';
import { Component, OnInit, ElementRef, HostListener, Renderer2, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'soft-dialog-container',
  templateUrl: './soft-dialog-container.component.html',
  styleUrls: ['./soft-dialog-container.component.scss'],
  host: {
    class: 'soft-dialog-container',
    role: 'dialog',
    tabIndex: '-1'
  }
})
export class SoftDialogContainerComponent implements OnInit, AfterViewInit {
  @ViewChild('dialog')
  dialogElement: ElementRef;
  level: number = 1;
  className: string;
  get isShown() {
    return this._isShown;
  }
  set isShown(shown: boolean) {
    this._isShown = shown;
    if (shown) {
      this.renderer.addClass(this.dialogElement.nativeElement, 'soft-show');
    } else {
      this.renderer.removeClass(this.dialogElement.nativeElement, 'soft-show');
    }
  }
  private _isShown = false;
  constructor(
    private element: ElementRef,
    private dialogRef: SoftDialogRef,
    private renderer: Renderer2
  ) { }

  ngOnInit() {
  }
  ngAfterViewInit() {
    setTimeout(() => {
      console.log('view init');
      this.isShown = true;
    }, 0);
  }

  onClose(event) {
    this.close();
  }

  @HostListener('click', ['$event'])
  onclick(event: any): void {
    if (this.element.nativeElement !== event.target) {
      return;
    }
    this.isShown = false;
    this.close();
  }

  @HostListener('window:keydown.esc', ['$event'])
  onEsc(event: any): void {
    if (!this.isShown) {
      return;
    }

    if (event.keyCode === 27) {
      event.preventDefault();
    }
    this.close();
  }

  private close() {
    this.dialogRef.hide();
  }
}
