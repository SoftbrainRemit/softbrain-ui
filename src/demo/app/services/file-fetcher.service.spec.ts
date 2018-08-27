/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FileFetcherService } from './file-fetcher.service';

describe('Service: FileFetcher', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FileFetcherService]
    });
  });

  it('should ...', inject([FileFetcherService], (service: FileFetcherService) => {
    expect(service).toBeTruthy();
  }));
});
