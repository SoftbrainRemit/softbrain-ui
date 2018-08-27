/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SoftMenuService } from './soft-menu.service';

describe('Service: SoftMenu', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SoftMenuService]
    });
  });

  it('should ...', inject([SoftMenuService], (service: SoftMenuService) => {
    expect(service).toBeTruthy();
  }));
});
