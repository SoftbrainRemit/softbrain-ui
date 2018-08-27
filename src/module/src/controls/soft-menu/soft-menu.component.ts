import { SoftMenuItem } from './../../models/soft-menu.interface';
import { SoftMenuService } from './../../services/soft-menu.service';
import { Component, OnInit, Input, ContentChild, TemplateRef, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'soft-menu',
  templateUrl: './soft-menu.component.html',
  styleUrls: ['./soft-menu.component.scss'],
  providers: [SoftMenuService]
})
export class SoftMenuComponent implements OnInit, OnChanges {
  @Input()
  menus: Array<SoftMenuItem>;
  @Input()
  collapse: boolean = false;
  @Input()
  mode: 'horizontal' | 'vertical' = 'vertical';
  @Input()
  trigger: 'hover' | 'click' = 'click';
  @Input()
  initIndex: any;
  @Input()
  background: string = '#ffffff';
  @Input()
  textColor: string = '#000000';
  @Input()
  hoverColor: string;
  @Input()
  activeColor: string = '#409eff';
  @Input()
  activeBackground: string;
  @ContentChild('menuItem')
  menuItemTemplate: TemplateRef<any>;

  constructor(
    public menuService: SoftMenuService
  ) {
  }

  ngOnInit() {
    this.menuService.setColors({
      bgColor: this.background,
      textColor: this.textColor,
      hoverColor: this.hoverColor,
      activeColor: this.activeColor,
      activeBgColor: this.activeBackground
    });
    this.menuService.trigger = this.trigger;
    this.menuService.template = this.menuItemTemplate;
    this.menuService.initIndex = this.initIndex;
    this.menuService.mode = this.mode;
  }

  ngOnChanges(changes: SimpleChanges) {
    const change = changes['initIndex'];
    if (change && change.previousValue !== change.currentValue) {
      this.menuService.initIndex = change.currentValue;
      this.menuService.onInitIndexSet.emit();
    }
  }
  getStyle() {
    const styles: any = {};
    if (this.menuService.colors && this.menuService.colors.bgColor) {
      styles['background-color'] = this.menuService.colors.bgColor;
    }
    if (this.menuService.colors && this.menuService.colors.textColor) {
      styles['color'] = this.menuService.colors.textColor;
    }
    return styles;
  }
}
