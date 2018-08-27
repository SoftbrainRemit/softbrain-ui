/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SoftIncreService } from './soft-incre.service';

describe('Service: SoftIncre', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SoftIncreService]
    });
  });

  it('should ...', inject([SoftIncreService], (service: SoftIncreService) => {
    expect(service).toBeTruthy();
  }));
});
