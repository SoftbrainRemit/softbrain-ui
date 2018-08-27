import { SoftTabsComponent } from './../controls/soft-tabs/soft-tabs.component';
import {
  Directive, Input, HostBinding, ContentChild, TemplateRef, Output, EventEmitter,
  ElementRef, OnInit, OnDestroy, Renderer2
} from '@angular/core';

@Directive({
  selector: 'tab, [tab]'
})
export class SoftTabDirective implements OnInit, OnDestroy {
  @Input()
  title: string;
  @Input()
  disabled: boolean;
  @Input()
  removable: boolean;
  @ContentChild('title')
  titleTemplate: TemplateRef<any>;
  @Output()
  select: EventEmitter<any> = new EventEmitter();
  @Output()
  removed: EventEmitter<any> = new EventEmitter();
  @Input()
  get active() {
    return this._active;
  }
  set active(active: boolean) {
    if (this._active === active) {
      return;
    }

    this._active = active;

    if (this._active) {
      this.select.emit(this);
      this.renderer.setStyle(this.elementRef.nativeElement, 'display', 'block');
    } else {
      this.renderer.setStyle(this.elementRef.nativeElement, 'display', 'none');
      return;
    }
    this.tabsComponent.tabs.forEach(t => {
      if (t !== this) {
        t.active = false;
      }
    });
  }

  private _active: boolean;
  elementRef: ElementRef;
  constructor(
    private tabsComponent: SoftTabsComponent,
    element: ElementRef,
    private renderer: Renderer2,
  ) {
    this.elementRef = element;
  }

  ngOnInit() {
    this.tabsComponent.addTab(this);
  }

  ngOnDestroy() {
    this.tabsComponent.removeTab(this);
  }
}
