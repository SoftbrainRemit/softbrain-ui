/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { App.routeService } from './app.route.service';

describe('Service: App.route', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [App.routeService]
    });
  });

  it('should ...', inject([App.routeService], (service: App.routeService) => {
    expect(service).toBeTruthy();
  }));
});
