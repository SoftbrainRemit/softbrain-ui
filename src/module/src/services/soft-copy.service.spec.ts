/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SoftCopyService } from './soft-copy.service';

describe('Service: SoftCopy', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SoftCopyService]
    });
  });

  it('should ...', inject([SoftCopyService], (service: SoftCopyService) => {
    expect(service).toBeTruthy();
  }));
});
