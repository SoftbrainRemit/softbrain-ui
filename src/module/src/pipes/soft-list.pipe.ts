import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'softFilter'
})
export class SoftListPipe implements PipeTransform {

  transform(value: Array<any>, condition: any): any {
    let list = value;
    for (const k in condition) {
      if (condition[k] instanceof Object) {
        list = this.transform(list, condition[k]);
      } else {
        // tslint:disable-next-line:triple-equals
        list = list.filter(e => e[k] == condition[k]);
      }
    }
    return list;
  }
}
