/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DataFetcherService } from './data-fetcher.service';

describe('Service: DataFetcher', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataFetcherService]
    });
  });

  it('should ...', inject([DataFetcherService], (service: DataFetcherService) => {
    expect(service).toBeTruthy();
  }));
});
