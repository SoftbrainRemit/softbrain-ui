import { Component, OnInit, ElementRef, Renderer2, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'soft-back-drop',
  templateUrl: './soft-back-drop.component.html',
  styleUrls: ['./soft-back-drop.component.scss']
})
export class SoftBackDropComponent implements OnInit, AfterViewInit {
  @ViewChild('backdrop')
  backdropElement: ElementRef;
  get isShown() {
    return this._shown;
  }
  set isShown(shown: boolean) {
    this._shown = shown;
    if (this._shown) {
      this.renderer.addClass(this.backdropElement.nativeElement, 'soft-show');
    } else {
      this.renderer.removeClass(this.backdropElement.nativeElement, 'soft-show');
    }
  }
  private _shown: boolean;
  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.isShown = true;
    }, 0);
  }
}
