import { Injectable } from '@angular/core';

@Injectable()
export class SoftPositionService {

  constructor() { }

  public getElementSize(el: any) {
    return {
      width: el.offsetWidth,
      height: el.offsetHeight
    };
  }

  public getWindowSize() {
    return {
      height: document.documentElement.clientHeight,
      width: document.documentElement.clientWidth
    };
  }

  public getPositionInView(el: any) {
    const viewPort = el.getBoundingClientRect();
    return viewPort;
  }

  public getAbsolute(target, reference?) {
    if (!reference) {
      reference = document;
    }
    const result: any = {
      left: -target.clientLeft,
      top: -target.clientTop
    };
    let node = target;
    while (node !== reference && node !== document) {
      result.left = result.left + node.offsetLeft + node.clientLeft;
      result.top = result.top + node.offsetTop + node.clientTop;
      node = node.parentNode;
    }
    if (isNaN(reference.scrollLeft)) {
      result.right = document.documentElement.scrollWidth - result.left;
      result.bottom = document.documentElement.scrollHeight - result.top;
    } else {
      result.right = reference.scrollWidth - result.left;
      result.bottom = reference.scrollHeight - result.top;
    }
    return result;
  }

  // 获取节点的真实宽高
  public getRealShape(el: HTMLElement): { width: number, height: number } {
    const rect: any = el.getBoundingClientRect();
    const { width, height } = window.getComputedStyle(el);
    const getCSSStyleVal: Function = (val: string | null | number, parentNum: number): number => {
      if (!val) { return 0; }
      const str = String(val);
      const strVal = str.includes('px') ? str.split('px')[0] :
        str.includes('%') ? Number(str.split('%')[0]) * parentNum * 0.01 : str;
      return Number.isNaN(Number(strVal)) ? 0 : Number(strVal);
    };
    return {
      width: getCSSStyleVal(width, rect.width),
      height: getCSSStyleVal(height, rect.height),
    };
  }

  public getPositionForDir(hostRect: ClientRect, selfRect: any, dir: string): any {
    const diffWidth: number = hostRect.width - selfRect.width;
    const diffHeight: number = selfRect.height - hostRect.height;
    const topMap: any = {
      top: - 10 - selfRect.height,
      bottom: hostRect.height + 10,
      left: 0 - Math.abs(diffHeight / 2),
      right: 0 - Math.abs(diffHeight / 2),
    };
    const leftMap: any = {
      left: - 10 - selfRect.width,
      right: hostRect.width + 10,
      top: diffWidth / 2,
      bottom: diffWidth / 2,
    };
    const isHorizontal: boolean = dir === 'left' || dir === 'right';
    const arrowLen = (isHorizontal ? selfRect.height : selfRect.width) - 12;

    const position = {
      arrowFace: dir,
      arrowDir: isHorizontal ? 'top' : 'right',
      arrowPosition: arrowLen / 2,
      top: topMap[dir],
      left: leftMap[dir],
    };

    return position;
  }
}
