/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SoftPositionService } from './soft-position.service';

describe('Service: SoftPosition', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SoftPositionService]
    });
  });

  it('should ...', inject([SoftPositionService], (service: SoftPositionService) => {
    expect(service).toBeTruthy();
  }));
});
