import { SoftMenuItem } from './../../module/src/models/soft-menu.interface';
import { Component, OnInit, enableProdMode } from '@angular/core';
import { RouteService } from './services/app.route.service';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/mergeMap';

enableProdMode();

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';
  menus: Array<SoftMenuItem>;

  constructor(
    public routeService: RouteService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    // this.router.events.filter(e => e instanceof NavigationEnd)
    // .map(e => this.activatedRoute)
    // .map(route => {
    //   while (route.firstChild) {
    //     route = route.firstChild;
    //   }
    //   return route;
    // })
    // .mergeMap(r => r.data)
    // .subscribe(d => {
    //   this.routeService.currentIndex = d.index;
    //   console.log(d);
    // });
  }

  ngOnInit() {
    this.title = 'softbrain-ui';
    this.menus = [{
      path: '/',
      label: 'Index',
      show: true,
      index: 'index'
    }, {
      label: 'Components',
      index: 'components',
      show: true,
      children: [{
        label: 'Input',
        path: '/components/input',
        show: true,
        index: 'input'
      }, {
        label: 'Select',
        path: '/components/select',
        show: true,
        index: 'select'
      }, {
        label: 'Checkbox',
        path: '/components/checkbox',
        show: true,
        index: 'checkbox'
      }, {
        label: 'Radio',
        path: '/components/radio',
        show: true,
        index: 'radio'
      }, {
        label: 'Button',
        path: '/components/button',
        show: true,
        index: 'button'
      }, {
        label: 'Tabs',
        path: '/components/tabs',
        show: true,
        index: 'tabs'
      }, {
        label: 'Dialog',
        path: '/components/dialog',
        show: true,
        index: 'dialog'
      }, {
        label: 'Menu',
        path: '/components/menu',
        show: true,
        index: 'menu'
      }, {
        label: 'Table',
        path: '/components/table',
        show: true,
        index: 'table'
      }, {
        label: 'Pager',
        path: '/components/pager',
        show: true,
        index: 'pager'
      }, {
        label: 'Badge',
        path: '/components/badge',
        show: true,
        index: 'badge'
      }, {
        label: 'Tooltip',
        path: '/components/tooltip',
        show: true,
        index: 'tooltip'
      }, {
        label: 'Steps',
        path: '/components/steps',
        show: true,
        index: 'steps'
      }, {
        label: 'Upload',
        path: '/components/upload',
        show: true,
        index: 'upload'
      }, {
        label: 'dropdown',
        path: '/components/dropdown',
        show: true,
        index: 'dropdown'
      }, {
        label: 'DatetimePicker',
        path: '/components/datetimepicker',
        show: true,
        index: 'datetimepicker'
      }]
    }];
  }
}
