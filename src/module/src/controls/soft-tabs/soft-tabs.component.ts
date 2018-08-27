import { SoftTabDirective } from '../../directives/soft-tab.directive';
import { Component, OnInit, Renderer2, Input } from '@angular/core';

@Component({
  selector: 'soft-tabs',
  templateUrl: './soft-tabs.component.html',
  styleUrls: ['./soft-tabs.component.scss']
})
export class SoftTabsComponent implements OnInit {
  @Input()
  justify: boolean = false;
  tabs: SoftTabDirective[];

  private isDestroyed: boolean;

  constructor(
    private renderer: Renderer2
  ) {
    this.isDestroyed = false;
  }

  ngOnInit() {
  }

  addTab(tab: SoftTabDirective) {
    this.tabs = this.tabs || [];
    this.tabs.push(tab);
    const index = this.getFirstTabIndex();
    tab.active = this.tabs[index] === tab;
  }

  removeTab(tab: SoftTabDirective, option = { emit: true }) {
    const index = this.tabs.indexOf(tab);
    if (index === -1 || this.isDestroyed || !tab.removable) {
      return;
    }
    this.tabs.splice(index, 1);
    if (tab.active) {
      let nextActiveIndex = this.getClosestTabIndex(index);
      if (nextActiveIndex < 0) {
        nextActiveIndex = this.getClosestTabIndex(index, true);
      }
      if (nextActiveIndex >= 0) {
        this.tabs[nextActiveIndex].active = true;
      }
    }
    if (option.emit) {
      tab.removed.emit(tab);
    }
    if (tab.elementRef.nativeElement.parentNode) {
      this.renderer.removeChild(tab.elementRef.nativeElement.parentNode, tab.elementRef.nativeElement);
    }
  }

  private getFirstTabIndex() {
    let index = -1;
    for (let i = 0; i < this.tabs.length; i++) {
      if (!this.tabs[i].disabled) {
        index = i;
        break;
      }
    }
    if (index < 0 && this.tabs.length) {
      index = 0;
    }
    return index;
  }

  private getClosestTabIndex(index: number, withDisabled: boolean = false) {
    if (!this.tabs.length) {
      return -1;
    }
    for (let i = 1; i <= this.tabs.length; i++) {
      const prevIndex = index - i;
      const nextIndex = index + i;
      if (this.tabs[prevIndex] && (withDisabled || !this.tabs[prevIndex].disabled)) {
        return prevIndex;
      }
      if (this.tabs[nextIndex] && (withDisabled || !this.tabs[nextIndex].disabled)) {
        return nextIndex;
      }
    }
    return -1;
  }

  onSelectTab(tab: SoftTabDirective) {
    if (!tab.disabled) {
      tab.active = true;
    }
  }
}
