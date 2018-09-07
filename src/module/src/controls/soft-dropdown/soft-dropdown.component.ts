import { Observable, Subscription } from 'rxjs';
import { reversalAnimation } from './../../animations/reversal-animation';
import { slideUpDownAnimation } from './../../animations/slide-up-down-animation';
import {
  Component, OnInit, ContentChild, TemplateRef, Input, ElementRef, AfterViewInit, ViewChild,
  NgZone, OnDestroy
} from '@angular/core';

@Component({
  selector: 'soft-dropdown',
  templateUrl: './soft-dropdown.component.html',
  styleUrls: ['./soft-dropdown.component.scss'],
  animations: [slideUpDownAnimation, reversalAnimation]
})
export class SoftDropdownComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('el')
  el: ElementRef;
  @Input()
  trigger: 'click' | 'hover' = 'click';
  @Input()
  placement: 'left' | 'right' = 'left';
  @ContentChild('action')
  actionTemplate: TemplateRef<any>;

  top: number = 0;
  show: boolean;
  private subscription: Subscription;
  constructor(
    private host: ElementRef,
    private ngZone: NgZone
  ) {
    this.ngZone.runOutsideAngular(() => {
      this.top = 0;
    });
  }

  ngOnInit() {
    this.subscription = Observable.fromEvent(document, 'click').subscribe(event => {
      if (!this.show && event.target !== this.host.nativeElement) {
        return;
      }
      this.triggerShow();
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngAfterViewInit() {
    this.ngZone.run(() => {
      this.top = this.el.nativeElement.offsetHeight + 5;
    });
  }

  onClick(event: Event) {
    event.stopPropagation();
    if (this.trigger !== 'click') {
      return;
    }
    this.triggerShow();
  }

  onMouseEnter() {
    if (this.show || this.trigger !== 'hover') {
      return;
    }
    this.triggerShow();
  }

  private triggerShow() {
    this.show = !this.show;
  }
}
