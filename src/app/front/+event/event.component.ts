import { Component, OnInit } from '@angular/core';
import { GOOGLE_MAPS_DIRECTIVES } from 'angular2-google-maps/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../shared/services/api.service';
import { SanitizeHtmlPipe } from '../../shared/pipes/sanitize-html.pipe';
import { DateFormatPipe } from 'angular2-moment';
import * as moment from 'moment';

@Component({
  moduleId: module.id,
  selector: 'app-event',
  templateUrl: 'event.component.html',
  styleUrls: ['event.component.css'],
  directives: [GOOGLE_MAPS_DIRECTIVES],
  pipes: [SanitizeHtmlPipe, DateFormatPipe]
})
export class EventComponent implements OnInit {
  public zoom: number = 15;
  public lat: number;
  public lng: number;
  public mapUrl: string;
  public address= {
    base: '',
    full: ''
  };
  public image: string;
  public eventId: string;
  public date:string;
  public eventData$;
  
  constructor(public apiService: ApiService, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.eventId = this.activatedRoute.snapshot.url[1].path;
    this.eventData$ = this.apiService.events$
      .map(events => events.find(item => item.id === this.eventId));
    this.eventData$.subscribe( data => {
      this.apiService.getEventDetails( this.eventId );
      if (data !== undefined) {
        if ('details' in data && 'media' in data.details) {
          this.image = data.details.media.url;
        } else {
          this.image = data.logo.url;
        }
        if ('details' in data && 'venue' in data.details) {
          let venue = data.details.venue;
          this.lat = Number(venue.latitude);
          this.lng = Number(venue.longitude);
          
          let base = '';
          if (venue.address.city !== null) {
            base = venue.address.city;
          }
          if (venue.address.region !== null) {
            if (base.length > 0) { base += ', '; }
            base += venue.address.region;
          }
          if (venue.address.country !== null) {
            if (base.length > 0) { base += ', '; }
            base += venue.address.country;
          }
          let full = base;
          if (venue.address.address_1 !== null) {
            full = venue.address.address_1 + ', ' + base;
          }
          this.address['base'] = base;
          this.address['full'] = full;
          this.mapUrl = 'https://www.google.com/maps/?q=' + full;
        }
        if ('start' in data) {
          let startMoment = moment( data.start.local, 'YYYY-MM-DDThh:mm:ss' );
          let endMoment = moment( data.end.local, 'YYYY-MM-DDThh:mm:ss' );
          let startString = startMoment.format('dddd, MMMM D, YYYY h:mm A');
          let endString;
          if (startMoment.format('YYYY-MM-DD') === endMoment.format('YYYY-MM-DD')) {
            endString = endMoment.format('h:mm A');
          } else {
            endString = endMoment.format('dddd, MMMM D, YYYY h:mm A');
          }
          this.date = startString + ' - ' + endString;
        }
      }
    });
  }

  isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

}
