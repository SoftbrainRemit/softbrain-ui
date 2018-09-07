import { StepsComponent } from './pages/components/steps/steps.component';
import { SoftbrainModule } from './../../module/src/softbrain.module';
import { TooltipComponent } from './pages/components/tooltip/tooltip.component';
import { BadgeComponent } from './pages/components/badge/badge.component';
import { PaginationComponent } from './pages/components/pagination/pagination.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenuComponent } from './pages/components/menu/menu.component';
import { DialogComponent } from './pages/components/dialog/dialog.component';
import { SelectComponent } from './pages/components/select/select.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HtmlBindComponent } from './controls/html-bind/html-bind.component';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { appRoutes } from './app.routing';
import { InputComponent } from './pages/components/input/input.component';
import { IndexComponent } from './pages/index/index.component';

import { MarkdownModule } from 'ngx-markdown';
import { CheckboxComponent } from './pages/components/checkbox/checkbox.component';
import { RadioComponent } from './pages/components/radio/radio.component';
import { ButtonComponent } from './pages/components/button/button.component';
import { TabsComponent } from './pages/components/tabs/tabs.component';
import { TableComponent } from './pages/components/table/table.component';
import { UploadComponent } from './pages/components/upload/upload.component';
import { DropdownComponent } from './pages/components/dropdown/dropdown.component';
import { DatetimePickerComponent } from './pages/components/datetime-picker/datetime-picker.component';

@NgModule({
  declarations: [
    AppComponent,
    InputComponent,
    IndexComponent,
    HtmlBindComponent,
    SelectComponent,
    CheckboxComponent,
    RadioComponent,
    ButtonComponent,
    TabsComponent,
    DialogComponent,
    MenuComponent,
    TableComponent,
    PaginationComponent,
    BadgeComponent,
    TooltipComponent,
    StepsComponent,
    UploadComponent,
    DropdownComponent,
    DatetimePickerComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    SoftbrainModule.forRoot(),
    HttpClientModule,
    MarkdownModule.forRoot(),
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
