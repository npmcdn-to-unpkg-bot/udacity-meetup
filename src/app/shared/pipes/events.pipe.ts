import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'appEvents'
})
export class EventsPipe implements PipeTransform {
  
  transform(value: any, args?: any): any {
    if (value === undefined || value === null) { return; };
    let found = [];
    let filtered = value.filter((item) => {
      if (item.logo !== null && found.indexOf(item.organizer_id) === -1) {
        found.push(item.organizer_id);
        return item;
      }
    });

    return filtered;
  }

}
