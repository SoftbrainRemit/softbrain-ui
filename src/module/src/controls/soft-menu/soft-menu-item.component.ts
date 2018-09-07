import { reversalAnimation } from './../../animations/reversal-animation';
import { dropAnimation } from './../../animations/drop-animation';
import { SoftMenuService } from './../../services/soft-menu.service';
import { SoftMenuItem } from './../../models/soft-menu.interface';
import { Component, OnInit, Input, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

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
    menuService: SoftMenuService;
    @Input()
    level = 0;
    expand: boolean;
    active: boolean;
    hover: boolean;
    private onHorizontalClickSubscriber: Subscription;
    private onInitIndexSetSubscriber: Subscription;
    constructor(
        private router: Router
    ) { }
    ngOnInit() {
        if (this.menu.children && this.menu.children.length && this.menuService.getActive(this.menu)) {
            this.expand = true;
        }
        this.onHorizontalClickSubscriber = this.menuService.onHorizontalClick.subscribe(() => {
            if (this.menuService.mode === 'horizontal' && !this.hover && this.expand) {
                this.expand = false;
            }
        });
        this.onInitIndexSetSubscriber = this.menuService.onInitIndexSet.subscribe(() => {
            if (this.menuService.trigger === 'click' && this.menuService.initIndex) {
                if (this.menu.children && this.menu.children.length && this.menuService.getActive(this.menu)) {
                    this.expand = true;
                }
            }
        });
    }

    ngOnDestroy() {
        this.onHorizontalClickSubscriber.unsubscribe();
        this.onInitIndexSetSubscriber.unsubscribe();
    }

    onFocus() {

    }
    onBlur() {
        if (this.menuService.trigger === 'hover' && this.expand === true && this.menu.children && this.menu.children.length) {
            this.expand = false;
        }
    }

    onMouseEnter() {
        if (this.menu.disabled) { return; }
        if (this.menuService.trigger === 'hover' && this.menu.children && this.menu.children.length) {
            this.expand = true;
            this.chkElement.nativeElement.focus();
        }
        this.hover = true;
    }
    onMouseLeave() {
        if (this.menu.disabled) { return; }
        if (!this.menuService.isCollapse) {
            this.hover = false;
        }
    }
    onMenuMouseLeave() {
        if (this.menu.disabled) { return; }
        if (this.hover) {
            this.hover = false;
        }
        if ((this.menuService.isCollapse || (this.menuService.mode === 'horizontal')) && this.expand) {
            this.expand = false;
        }
    }
    clickHandle(menu: SoftMenuItem) {
        if (this.menu.disabled) { return; }
        if (!menu.path && this.menuService.trigger === 'click' && menu.children && menu.children.length) {
            this.expand = !this.expand;
            return;
        }
        if (menu.path) {
            if (this.menuService.mode === 'horizontal') {
                this.menuService.onHorizontalClick.emit();
            }
            this.router.navigate([menu.path]);
        }
        this.menuService.initIndex = menu.index;
    }

    getStyle() {
        const style: any = {};
        const colors = this.menuService.colors || {};
        this.active = this.menuService.getActive(this.menu);
        if (this.hover) {
            style.color = colors.hoverColor || '';
            style['background-color'] = this.menuService.getHoverBackgroundColor() || '';
        } else if (this.active) {
            style.color = colors.activeColor || '';
            style['background-color'] = colors.activeBgColor || '';
        } else {
            style.color = colors.textColor || '';
            style['background-color'] = colors.bgColor || '';
        }
        if (this.menu.disabled) {
            style.color = this.menuService.getHoverBackgroundColor(this.menuService.colors.textColor) || '';
        }
        return style;
    }

    getMenuBackgroundColor() {
        this.active = this.menuService.getActive(this.menu);
        if (this.active) {
            return this.menuService.colors.activeBgColor || '';
        } else {
            return 'transparent';
        }
    }
}
