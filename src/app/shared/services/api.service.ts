import { Injectable} from '@angular/core';
import { Http } from '@angular/http';
import { SearchParamsService } from './search-params.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { EventsPipe } from '../pipes/events.pipe';

@Injectable()
export class ApiService {
  public preEvents$;
  public preVenues$;
  public preMedia$;
  public events = [];
  public venues = {};
  public media = {};
  constructor(
    public http: Http,
    public searchParamsService: SearchParamsService) {
    this.preEvents$ = new BehaviorSubject(this.events);
    this.preVenues$ = new BehaviorSubject(this.venues);
    this.preMedia$ = new BehaviorSubject(this.media);
  }

  checkEmail(email) {
    let api_key = 'pubkey-b7fb0c2576ed98d64fafc660d9ad42e2';
    let url = 'https://api.mailgun.net/v2/address/validate?api_key=' + api_key;
    let searchParams = this.searchParamsService.transform( {address: email} );
    return this.http.get(url, {
        search: searchParams
    })
    .map( (responseData) => {
      let response = responseData.json();
      return response
    });
  }

  observe(paramsObj, apiLocation) {
    let url = 'https://www.eventbriteapi.com/v3/' + apiLocation + '/?token=S6S7G427VEDSLNEQRE6B';
    let searchParams = this.searchParamsService.transform(paramsObj);
    return this.http.get(url, {
        search: searchParams
    })
    .map( (responseData) => {
      let response = responseData.json();
      return response
    });
  }

  getCordinates(address) {
    let url = 'https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyBE1Bb86PEGx-11LahjWCZS2cFOWMpNseI';
    let searchParams = this.searchParamsService.transform({address:address});
    return this.http.get(url, {
        search: searchParams
    })
    .map( (responseData) => {
      let response = responseData.json();
      return response
    });
  }

  getEventDetails(eventId) {
    let index;
    for (let i = 0; i < this.events.length; i++) {
      if (eventId === this.events[i].id) {
        index = i;
      }
    }
    if (index !== undefined && !("details" in this.events[index])) {
      this.events[index]['details'] = {};
      this.observe({}, 'venues/' + this.events[index].venue_id )
      .subscribe(data => {
          this.events[index]['details']['venue'] = data;
          this.checkIfDone(index);
      });
      this.observe({}, 'media/' + this.events[index].logo_id )
      .subscribe(data => {
          this.events[index]['details']['media'] = data;
          this.checkIfDone(index);
      });
    }
  }

  checkIfDone(index) {
    if ( ("venue" in this.events[index].details) &&
         ("media" in this.events[index].details) ) {
      this.updateEvents();
    }
  }

  loadEvents() {
    // Testing using Camarillo cordinates
    // TODO: base off of IP using http://freegeoip.net/json/[ip-address-here]
    for (let i = 1; i <= 4; i++) {
      let testParams = {
        'location.within': '10mi',
        'location.latitude': '34.2321',
        'location.longitude': '-119.0752',
        'page': i
      };
      this.observe(testParams, 'events/search').subscribe(
        data => {
          this.events.push(...data.events);
          this.updateEvents();
        },
        error => {
          let errorObj = JSON.parse( error._body );
          let message = errorObj.error_description;
          console.log( message );
        }
      );
    }
  }

  updateEvents() {
    let filtered = new EventsPipe().transform(this.events);
    //console.log(filtered);
    this.preEvents$.next( filtered );
  }

  public addEvent(data):void {
    this.events.push(data);
    this.updateEvents();
  }

  get events$() {
    return this.preEvents$.asObservable();
  }

  get venues$() {
    return this.preVenues$.asObservable();
  }

  get media$() {
    return this.preMedia$.asObservable();
  }

}

