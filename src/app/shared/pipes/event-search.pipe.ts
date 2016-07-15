import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'appEventSearch'
})
export class EventSearchPipe implements PipeTransform {

  transform(value: any, term?, filteredCount?): any {
    
    let queries = [];
    if (value === undefined) { return; }
    if (term === null || term === undefined) { return value; }
    if (term.length) { queries = term.toLowerCase().split( ' ' ); }
    let filtered = value.filter((item) => {
      if (term.length) {
        let str = (
          item.name.text + ' ' +
          item.description.text + ' ').toLowerCase();
        for (let i = 0 ; i < queries.length; i++) {
            if (str.indexOf( queries[i] ) === -1) { return false; }
        }
      }
      return item;
    });
    filteredCount.count = filtered.length;
    return filtered;
  }

}
