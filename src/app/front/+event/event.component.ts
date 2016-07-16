import { Component, OnInit } from '@angular/core';
import { GOOGLE_MAPS_DIRECTIVES } from 'angular2-google-maps/core';
import { ActivatedRoute } from '@angular/router';
import { MapStyles } from './map-styles';
import { ApiService } from '../../shared/services/api.service';
import { SanitizeHtmlPipe } from '../../shared/pipes/sanitize-html.pipe';

@Component({
  moduleId: module.id,
  selector: 'app-event',
  templateUrl: 'event.component.html',
  styleUrls: ['event.component.css'],
  directives: [GOOGLE_MAPS_DIRECTIVES],
  pipes: [SanitizeHtmlPipe]
})
export class EventComponent implements OnInit {
  public zoom: number = 15;
  public lat: number;
  public lng: number;
  public address= {
    base: '',
    full: ''
  };
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
      if (data !== undefined && 'details' in data && 'venue' in data.details) {
        let venue = data.details.venue;
        this.lat = Number(venue.latitude);
        this.lng = Number(venue.longitude);
        this.address['base'] = venue.address.city + ', ' + venue.address.region + ', ' + venue.address.country;
        this.address['full'] = venue.address.address_1 + ', ' + this.address.base;
      }
    });
  }

}
