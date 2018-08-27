import { SoftPager } from './../models/soft-pager';
import { Injectable } from '@angular/core';

@Injectable()
export class SoftPagerService {

  constructor() { }

  public initPager(): SoftPager {
    return {
      currentPage: 1,
      pageSize: 10
    };
  }

}
