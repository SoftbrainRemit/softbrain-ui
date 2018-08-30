import { SoftMenuService } from './services/soft-menu.service';
import { SoftIncreService } from './services/soft-incre.service';
import { SoftPagerService } from './services/soft-pager.service';
import { SoftPositionService } from './services/soft-position.service';
import { SoftCopyService } from './services/soft-copy.service';
import { SoftDialogService } from './services/soft-dialog.service';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoftInputComponent } from './controls/soft-input/soft-input.component';
import { SoftCopyComponent } from './controls/soft-copy/soft-copy.component';
import { SoftSelectComponent } from './controls/soft-select/soft-select.component';
import { SoftCheckboxComponent } from './controls/soft-checkbox/soft-checkbox.component';
import { SoftRadioComponent } from './controls/soft-radio/soft-radio.component';
import { SoftButtonComponent } from './controls/soft-button/soft-button.component';
import { SoftTabsComponent } from './controls/soft-tabs/soft-tabs.component';
import { SoftBackDropComponent } from './controls/soft-dialog/soft-back-drop.component';
import { SoftDialogContainerComponent } from './controls/soft-dialog/soft-dialog-container.component';
import { SoftMenuComponent } from './controls/soft-menu/soft-menu.component';
import { SoftSubMenuComponent } from './controls/soft-menu/soft-sub-menu.component';
import { SoftMenuItemComponent } from './controls/soft-menu/soft-menu-item.component';
import { SoftTableComponent } from './controls/soft-table/soft-table.component';
import { SoftTableColumnComponent } from './controls/soft-table/soft-table-column/soft-table-column.component';
import { SoftPaginationComponent } from './controls/soft-pagination/soft-pagination.component';
import { SoftTooltipComponent } from './controls/soft-tooltip/soft-tooltip.component';
import { SoftBadgeComponent } from './controls/soft-badge/soft-badge.component';
import { SoftStepsComponent } from './controls/soft-steps/soft-steps.component';
import { SoftUploadComponent } from './controls/soft-upload/soft-upload.component';

import { SoftTabDirective } from './directives/soft-tab.directive';
import { SoftListPipe } from './pipes/soft-list.pipe';
import { PdfViewerModule } from 'ng2-pdf-viewer';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        RouterModule,
        PdfViewerModule
    ],
    declarations: [
        SoftInputComponent,
        SoftCopyComponent,
        SoftSelectComponent,
        SoftCheckboxComponent,
        SoftRadioComponent,
        SoftButtonComponent,
        SoftTabsComponent,
        SoftTabDirective,
        SoftBackDropComponent,
        SoftDialogContainerComponent,
        SoftMenuComponent,
        SoftSubMenuComponent,
        SoftMenuItemComponent,
        SoftTableComponent,
        SoftTableColumnComponent,
        SoftPaginationComponent,
        SoftBadgeComponent,
        SoftTooltipComponent,
        SoftStepsComponent,
        SoftUploadComponent,

        SoftListPipe,
    ],
    providers: [
        SoftIncreService,
        SoftPositionService,
        SoftCopyService,
        SoftPagerService,
        SoftDialogService,
        SoftMenuService,
    ],
    exports: [
        SoftInputComponent,
        SoftCopyComponent,
        SoftSelectComponent,
        SoftCheckboxComponent,
        SoftRadioComponent,
        SoftButtonComponent,
        SoftTabsComponent,
        SoftTabDirective,
        SoftMenuComponent,
        SoftTableComponent,
        SoftTableColumnComponent,
        SoftPaginationComponent,
        SoftBadgeComponent,
        SoftTooltipComponent,
        SoftStepsComponent,
        SoftUploadComponent,

        SoftListPipe,
    ],
    entryComponents: [
        SoftDialogContainerComponent,
        SoftBackDropComponent,
    ]
})
export class SoftbrainModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SoftbrainModule,
            providers: [
                SoftCopyService,
                SoftPagerService,
                SoftDialogService,
            ]
        };
    }
}
