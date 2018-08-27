import { reversalAnimation } from './../../animations/reversal-animation';
import { dropAnimation } from './../../animations/drop-animation';
import { SoftMenuService } from './../../services/soft-menu.service';
import { SoftMenuItem } from './../../models/soft-menu.interface';
import { Component, OnInit, Input, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'soft-menu-item',
    templateUrl: './soft-menu-item.component.html',
    styleUrls: ['./soft-menu-item.component.scss'],
    animations: [dropAnimation, reversalAnimation]
})
export class SoftMenuItemComponent implements OnInit, OnDestroy {
    @ViewChild('chk')
    chkElement: ElementRef;
    @Input()
    menu: SoftMenuItem;
    @Input()
    serviceInstance: SoftMenuService;
    expand: boolean;
    active: boolean;
    hover: boolean;
    constructor(
        private router: Router
    ) { }
    ngOnInit() {
        if (this.menu.children && this.menu.children.length && this.serviceInstance.getActive(this.menu)) {
            this.expand = true;
        }
        this.serviceInstance.onHorizontalClick.subscribe(() => {
            if (this.serviceInstance.mode === 'horizontal' && !this.hover && this.expand) {
                this.expand = false;
            }
        });
        this.serviceInstance.onInitIndexSet.subscribe(() => {
            if (this.serviceInstance.trigger === 'click' && this.serviceInstance.initIndex) {
                if (this.menu.children && this.menu.children.length && this.serviceInstance.getActive(this.menu)) {
                    this.expand = true;
                }
            }
        });
    }

    ngOnDestroy() {
        this.serviceInstance.onHorizontalClick.unsubscribe();
    }

    onFocus() {

    }
    onBlur() {
        if (this.serviceInstance.trigger === 'hover' && this.expand === true && this.menu.children && this.menu.children.length) {
            this.expand = false;
        }
    }

    onMouseEnter() {
        if (this.menu.disabled) { return; }
        if (this.serviceInstance.trigger === 'hover' && this.menu.children && this.menu.children.length) {
            this.expand = true;
            this.chkElement.nativeElement.focus();
        }
        this.hover = true;
    }
    onMouseLeave() {
        if (this.menu.disabled) { return; }
        this.hover = false;
    }
    clickHandle(menu: SoftMenuItem) {
        if (this.menu.disabled) { return; }
        if (!menu.path && this.serviceInstance.trigger === 'click' && menu.children && menu.children.length) {
            this.expand = !this.expand;
            return;
        }
        if (menu.path) {
            if (this.serviceInstance.mode === 'horizontal') {
                this.serviceInstance.onHorizontalClick.emit();
            }
            this.router.navigate([menu.path]);
        }
        this.serviceInstance.initIndex = menu.index;
    }

    getStyle() {
        const style: any = {};
        const colors = this.serviceInstance.colors || {};
        this.active = this.serviceInstance.getActive(this.menu);
        if (this.hover) {
            style.color = colors.hoverColor || '';
            style['background-color'] = this.serviceInstance.getHoverBackgroundColor() || '';
        } else if (this.active) {
            style.color = colors.activeColor || '';
            style['background-color'] = colors.activeBgColor || '';
        } else {
            style.color = colors.textColor || '';
            style['background-color'] = colors.bgColor || '';
        }
        if (this.menu.disabled) {
            style.color = this.serviceInstance.getHoverBackgroundColor(this.serviceInstance.colors.textColor) || '';
        }
        return style;
    }

    getMenuBackgroundColor() {
        this.active = this.serviceInstance.getActive(this.menu);
        if (this.active) {
            return this.serviceInstance.colors.activeBgColor || '';
        } else {
            return 'transparent';
        }
    }
}
