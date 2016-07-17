import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'appEvents'
})
export class EventsPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value === undefined || value === null) { return; };
    let currentTime = moment().valueOf();
    let temp = [];
    let found = [];
    let filtered = value.filter((item) => {
      if (item.logo !== null && found.indexOf(item.organizer_id) === -1) {
        found.push(item.organizer_id);
        item['unix'] = moment( item.start.utc ).valueOf();
        if (currentTime < item.unix) {
          return item;
        }
      }
      else {
        temp.push(item);
      }
    });
    let sorted = filtered.sort( (a, b) => {
      return a.unix - b.unix;
    });
    return sorted;
  }

}
