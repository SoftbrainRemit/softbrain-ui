/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SoftPagerService } from './soft-pager.service';

describe('Service: SoftPager', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SoftPagerService]
    });
  });

  it('should ...', inject([SoftPagerService], (service: SoftPagerService) => {
    expect(service).toBeTruthy();
  }));
});
