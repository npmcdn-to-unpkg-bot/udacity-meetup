import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { SearchParamsService } from './search-params.service';

@Injectable()
export class ApiService {
  constructor(public http: Http, public searchParamsService: SearchParamsService) {}

  observe(paramsObj) {
    let searchParams = this.searchParamsService.transform(paramsObj);
    return this.http.get('https://www.eventbriteapi.com/v3/events/search/?token=S6S7G427VEDSLNEQRE6B', {
        search: searchParams
    })
    .map( (responseData) => {
      return responseData.json();
    });
  }

}

