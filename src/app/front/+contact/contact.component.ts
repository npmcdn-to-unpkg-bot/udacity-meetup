import { Component, ElementRef } from '@angular/core';
import { MapsAPILoader } from 'angular2-google-maps/core';
declare var google: any;

@Component({
  moduleId: module.id,
  selector: 'app-contact',
  templateUrl: 'contact.component.html',
  styleUrls: ['contact.component.css']
})
export class ContactComponent {
  
  constructor(private mapsApiLoader: MapsAPILoader, private element: ElementRef) {
    this.autocomplete();
  }

  private autocomplete():void {
    // Sets up Google Maps autocomplete suggestions
    this.mapsApiLoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete( this.element.nativeElement.firstElementChild, {});
      google.maps.event.addListener(autocomplete, 'place_changed', () => {
          let place = autocomplete.getPlace();
          console.log(place);
      });
    });
  }
}
