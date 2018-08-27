import { StepsComponent } from './pages/components/steps/steps.component';
import { TooltipComponent } from './pages/components/tooltip/tooltip.component';
import { BadgeComponent } from './pages/components/badge/badge.component';
import { PaginationComponent } from './pages/components/pagination/pagination.component';
import { MenuComponent } from './pages/components/menu/menu.component';
import { DialogComponent } from './pages/components/dialog/dialog.component';
import { CheckboxComponent } from './pages/components/checkbox/checkbox.component';
import { SelectComponent } from './pages/components/select/select.component';
import { InputComponent } from './pages/components/input/input.component';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './pages/index/index.component';
import { RadioComponent } from './pages/components/radio/radio.component';
import { ButtonComponent } from './pages/components/button/button.component';
import { TabsComponent } from './pages/components/tabs/tabs.component';
import { CanActivedService } from './services/canActived.service';
import { TableComponent } from './pages/components/table/table.component';

export const appRoutes: Routes = [{
  path: 'index',
  canActivate: [CanActivedService],
  canActivateChild: [CanActivedService],
  children: [{
    path: '',
    component: IndexComponent
  }],
  data: { index: 'index' }
}, {
  canActivate: [CanActivedService],
  canActivateChild: [CanActivedService],
  path: 'components',
  children: [{
    path: 'input',
    component: InputComponent,
    data: { index: 'input' }
  }, {
    path: 'select',
    component: SelectComponent,
    data: { index: 'select' }
  }, {
    path: 'checkbox',
    component: CheckboxComponent,
    data: { index: 'checkbox' }
  }, {
    path: 'radio',
    component: RadioComponent,
    data: { index: 'radio' }
  }, {
    path: 'button',
    component: ButtonComponent,
    data: { index: 'button' }
  }, {
    path: 'tabs',
    component: TabsComponent,
    data: { index: 'tabs' }
  }, {
    path: 'dialog',
    component: DialogComponent,
    data: { index: 'dialog' }
  }, {
    path: 'menu',
    component: MenuComponent,
    data: { index: 'menu' }
  }, {
    path: 'table',
    component: TableComponent,
    data: { index: 'table' }
  }, {
    path: 'pager',
    component: PaginationComponent,
    data: { index: 'pager' }
  }, {
    path: 'badge',
    component: BadgeComponent,
    data: { index: 'badge' }
  }, {
    path: 'tooltip',
    component: TooltipComponent,
    data: { index: 'tooltip' }
  }, {
    path: 'steps',
    component: StepsComponent,
    data: { index: 'steps' }
  }]
}, {
  path: '**',
  redirectTo: 'index',
  pathMatch: 'full'
}];
