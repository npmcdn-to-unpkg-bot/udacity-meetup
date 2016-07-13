import { Injectable} from '@angular/core';
import { Http } from '@angular/http';
import { SearchParamsService } from './search-params.service';
import { Subject } from 'rxjs/Subject';
import { EventsPipe } from '../pipes/events.pipe';

@Injectable()
export class ApiService {
  public preEvents$;
  public events = [];
  constructor(
    public http: Http,
    public searchParamsService: SearchParamsService) {
    this.preEvents$ = new Subject();
  }

  observe(paramsObj) {
    let url = 'https://www.eventbriteapi.com/v3/events/search/?token=S6S7G427VEDSLNEQRE6B';
    let searchParams = this.searchParamsService.transform(paramsObj);
    return this.http.get(url, {
        search: searchParams
    })
    .map( (responseData) => {
      return responseData.json();
    });
  }

  loadEvents() {
    for (let i = 1; i <= 4; i++) {
      let testParams = {
        'location.within': '10mi',
        'location.latitude': '34.2321',
        'location.longitude': '-119.0752',
        'page': i
      };
      this.observe(testParams)
        .subscribe(data => {
          this.events.push(...data.events);
          let filtered = new EventsPipe().transform(this.events);
          this.preEvents$.next( filtered );
        });
    }
    
  }

  get events$() {
    return this.preEvents$.asObservable();
  }

}

