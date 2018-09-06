import { SoftMenuItem } from './../models/soft-menu.interface';
import { Injectable, EventEmitter, TemplateRef } from '@angular/core';

@Injectable()
export class SoftMenuService {
  initIndex: any;
  opendIndexes: Array<any>;
  colors: {
    bgColor?: string;
    textColor?: string;
    hoverColor?: string;
    activeColor?: string;
    activeBgColor?: string;
  };
  trigger: 'hover' | 'click';
  mode: 'vertical' | 'horizontal';
  isCollapse: boolean;
  showIcon: boolean;
  template: TemplateRef<any>;
  onHorizontalClick: EventEmitter<any> = new EventEmitter();
  onInitIndexSet: EventEmitter<any> = new EventEmitter();
  constructor() { }

  setColors(option: {
    bgColor?: string;
    textColor?: string;
    hoverColor?: string;
    activeColor?: string;
    activeBgColor?: string;
  }) {
    this.colors = this.colors || {};
    this.colors = option;
  }

  setCollapse(collapse: boolean) {
    this.isCollapse = collapse;
  }

  setShowIcon(showIcon: boolean) {
    this.showIcon = showIcon;
  }

  getHoverBackgroundColor(color?: string) {
    return (color || this.colors.bgColor) ? this.hexToRGB(color || this.colors.bgColor) : '';
  }

  private hexToRGB(color: string): string {
    const hex: number = + color.replace('#', '0x');
    const rgb: number[] = [(hex & 0xff0000) >> 16, (hex & 0x00ff00) >> 8, hex & 0x0000ff];
    return `rgb(${rgb.map(v => ~~(0.8 * v)).join(',')})`;
  }

  getActive(menu: SoftMenuItem) {
    if (!menu) {
      return false;
    }
    if (menu.index === this.initIndex) {
      return true;
    } else if (menu.children && menu.children.length) {
      for (let i = 0; i < menu.children.length; i++) {
        if (this.getActive(menu.children[i])) {
          return true;
        }
      }
    }
    return false;
  }
}
