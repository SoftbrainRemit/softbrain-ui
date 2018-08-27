/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SoftDialogService } from './soft-dialog.service';

describe('Service: SoftDialog', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SoftDialogService]
    });
  });

  it('should ...', inject([SoftDialogService], (service: SoftDialogService) => {
    expect(service).toBeTruthy();
  }));
});
