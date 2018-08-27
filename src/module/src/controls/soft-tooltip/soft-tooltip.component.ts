import { fadeAnimation } from './../../animations/fadeAnimation';
import { SoftPositionService } from './../../services/soft-position.service';
import { Component, OnInit, Input, ElementRef, ViewChild, ContentChild, TemplateRef, AfterContentInit, Renderer2 } from '@angular/core';
export interface Shape { width: number; height: number; }

@Component({
  selector: 'soft-tooltip',
  templateUrl: './soft-tooltip.component.html',
  styleUrls: ['./soft-tooltip.component.scss'],
  animations: [fadeAnimation]
})
export class SoftTooltipComponent implements OnInit, AfterContentInit {
  @ViewChild('tipEl')
  tipElement: ElementRef<any>;
  @Input()
  show: boolean = true;
  @Input()
  disabled: boolean = false;
  @Input()
  message: string;
  @Input()
  placement: 'top' | 'bottom' | 'left' | 'right' = 'top';
  @Input()
  color: 'primary' | 'danger' | 'warning' | 'success' = 'primary';
  @ContentChild('tooltip')
  tooltipTemplate: TemplateRef<any>;
  left: string;
  bottom: string;
  right: string;
  top: string;
  hover: boolean;
  cache: any = {};
  tipElementShape: Shape;
  xPlacement: string = 'bottom';
  constructor(
    private positionService: SoftPositionService,
    private element: ElementRef<any>,
    private renderer: Renderer2
  ) { }

  ngOnInit() {
  }

  ngAfterContentInit() {
    const tipElement: HTMLElement = this.tipElement.nativeElement;
    const hostElement: HTMLElement = this.element.nativeElement.children[0];
    this.cache.tipElement = tipElement;
    const timer = setTimeout(() => {
      this.tipElementShape = this.positionService.getRealShape(tipElement);
      const tipRect = { width: tipElement.offsetWidth, height: tipElement.offsetHeight };
      const hostRect = hostElement.getBoundingClientRect();
      this.getPosition(hostRect, tipRect);
      clearTimeout(timer);
    }, 0);
  }

  onMouseEnter(event) {
    if (this.disabled || !this.show) {
      return;
    }
    this.setPopoerPositionAndShow();
    this.hover = true;
  }

  onMouseLeave(event) {
    this.hover = false;
  }

  getPosition(hostRect: any, selfRect: any): void {
    const dir: string = this.placement;
    const position: any = this.positionService.getPositionForDir(hostRect, selfRect, dir);
    this.cache.position = position;
    this.cache.hostRect = hostRect;
  }
  // update(): void {
  //   const { tipElement, hostRect } = this.cache;
  //   this.renderer.setStyle(tipElement, 'width', 'auto');
  //   this.renderer.setStyle(tipElement, 'height', 'auto');
  //   setTimeout(() => {
  //     this.tipElementShape = this.positionService.getRealShape(tipElement);
  //     const tipRect = { width: tipElement.offsetWidth, height: tipElement.offsetHeight };
  //     this.getPosition(hostRect, tipRect);
  //     this.renderer.setStyle(tipElement, 'width', `${this.tipElementShape.width}px`);
  //     this.renderer.setStyle(tipElement, 'height', `${this.tipElementShape.height}px`);
  //   }, 0);
  // }

  setPopoerPositionAndShow(): void {
    const { tipElement, position } = this.cache;
    const arrowElement: Element = tipElement.querySelector('.soft-tooltip-arrow');
    this.xPlacement = this.placement;
    this.renderer.setStyle(tipElement, 'left', `${position.left}px`);
    this.renderer.setStyle(tipElement, 'top', `${position.top}px`);

    // fix tipbox auto wrap
    this.renderer.setStyle(tipElement, 'width', `${this.tipElementShape.width}px`);
    this.renderer.setStyle(tipElement, 'height', `${this.tipElementShape.height}px`);
    this.renderer.setStyle(arrowElement, position.arrowDir, `${position.arrowPosition}px`);
  }
}
