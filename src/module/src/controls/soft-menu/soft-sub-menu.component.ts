import { SoftPositionService } from './../../services/soft-position.service';
import { SoftMenuService } from './../../services/soft-menu.service';
import { SoftMenuItem } from './../../models/soft-menu.interface';
import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'soft-sub-menu',
    templateUrl: './soft-sub-menu.component.html',
    styleUrls: ['./soft-sub-menu.component.scss'],
})
export class SoftSubMenuComponent implements OnInit {
    @Input()
    menus: Array<SoftMenuItem>;
    @Input()
    serviceInstance: SoftMenuService;
    constructor(
        private posService: SoftPositionService
    ) { }
    ngOnInit() {
    }

    getStyle() {
        const style: any = {};
        style['background-color'] = this.serviceInstance.colors.bgColor || '';
        return style;
    }
}
