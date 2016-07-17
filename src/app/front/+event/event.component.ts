import { Component, OnInit } from '@angular/core';
import { GOOGLE_MAPS_DIRECTIVES } from 'angular2-google-maps/core';
import { ActivatedRoute } from '@angular/router';
import { MapStyles } from './map-styles';
import { ApiService } from '../../shared/services/api.service';
import { SanitizeHtmlPipe } from '../../shared/pipes/sanitize-html.pipe';
import { DateFormatPipe } from 'angular2-moment';

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
  public styles = MapStyles;
  public eventId: string;
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
      }
    });
  }

  isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

}
