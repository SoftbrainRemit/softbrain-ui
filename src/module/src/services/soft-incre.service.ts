import { Injectable } from '@angular/core';

@Injectable()
export class SoftIncreService {
  private num: number = 1;
  constructor() { }
  public getNum() {
    const temp = this.num;
    this.num++;
    return temp;
  }
}
