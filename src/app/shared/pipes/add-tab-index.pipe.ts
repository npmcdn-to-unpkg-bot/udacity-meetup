import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'appAddTabIndex'
})
export class AddTabIndexPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value === null || value === undefined) { return value; }
    let search:string;
    let linkReplacement:string = '<a tabindex="20" aria-label="external content from event creator"';
    let buttonReplacement:string = '<a tabindex="20"';

    search = '<a';
    value = value.split(search).join(linkReplacement);
    
    search = '<A';
    value = value.split(search).join(linkReplacement);

    search = '<BUTTON';
    value = value.split(search).join(buttonReplacement);

    search = '<button';
    value = value.split(search).join(buttonReplacement);
    
    return value;
  }

}
