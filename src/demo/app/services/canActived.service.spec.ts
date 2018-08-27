/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CanActivedService } from './canActived.service';

describe('Service: CanActived', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CanActivedService]
    });
  });

  it('should ...', inject([CanActivedService], (service: CanActivedService) => {
    expect(service).toBeTruthy();
  }));
});
