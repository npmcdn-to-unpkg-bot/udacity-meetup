import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'appCleanDates'
})
export class CleanDatesPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    value = value.toLowerCase();
    // http://stackoverflow.com/a/15604206/5357459
    var mapObj = {
      '"': '',
      'january': '',
      'february': '',
      'march': '',
      'april': '',
      'may': '',
      'june': '',
      'july': '',
      'august': '',
      'september': '',
      'october': '',
      'november': '',
      'december': '',
      'camarillo': ''
    };
    for (let i = 1; i <= 31; i++) {
      mapObj[i + ', '] = '';
    }
    for (let i = 1; i <= 31; i++) {
      let ordinal = this.getOrdinal(i) + ', ';
      mapObj[ordinal] = '';
    }
    for (let i = 2000; i < 2031; i++) {
      mapObj[i] = '';
    }

    var re = new RegExp(Object.keys(mapObj).join('|'),'gi');
    value = value.replace(re, function(matched){
      return mapObj[matched];
    });

    let sections = value.split(/\s*\ - \s*/g);
    let max = 0;
    if (sections.length > 1) {
      for (let i = 0; i < sections.length; i++) {
        //console.log(sections[i].length + 'i#' + i + ', => ' + sections[i]);
        if (sections[i].length > sections[max].length) {
          max = i;
        }
      }
    }

    value = this.toTitleCase( sections[max] );
    value = value.replace(/ *\([^)]*\) */g, '');
    value = this.limitLength(value);
    return value;
  }

  // http://stackoverflow.com/a/12487454/5357459
  getOrdinal(n) {
      if((parseFloat(n) == parseInt(n)) && !isNaN(n)){
          let s = ['th', 'st', 'nd', 'rd'],
          v=n%100;
          return n + (s[(v-20)%10] || s[v] || s[0]);
      }
      return n; 
  }

  // http://stackoverflow.com/a/196991/5357459
  toTitleCase(str) {
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  }

  limitLength(str) {
    let limit = 50;
    if (str.length > limit) {
      str = str.substr(0, limit) + '...';
    }
    return str;
  }

}
