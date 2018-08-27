import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { RouteService } from './app.route.service';

@Injectable({
  providedIn: 'root'
})
export class CanActivedService implements CanActivate, CanActivateChild {

  constructor(
    private routeService: RouteService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (route.data.index) {
      this.routeService.currentIndex = route.data.index;
    }
    return true;
  }
  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.canActivate(childRoute, state);
  }
}
