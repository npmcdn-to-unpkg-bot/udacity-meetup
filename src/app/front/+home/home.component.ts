import { Component, OnInit, ElementRef } from '@angular/core';
import { EventsComponent } from '../components/events/index';
import { Autofocus } from '../../shared/directives/autofocus.directive';
import { ApiService } from '../../shared/services/api.service';

declare let Vimeo: any;

@Component({
  moduleId: module.id,
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css'],
  directives: [EventsComponent, Autofocus]
})
export class HomeComponent implements OnInit {
  public video: any;
  private intervalReference;
  constructor(public element: ElementRef, private apiService: ApiService) {}

  ngOnInit() {
    let iframe = document.getElementById('hero-video');
    this.video = new Vimeo.Player(iframe);
    this.intervalReference = setInterval( () => {
      this.video.setCurrentTime(231);
    }, 15000);


    // Testing using Camarillo cordinates
    // TODO: base off of IP using http://freegeoip.net/json/[ip-address-here]
    let testParams = {
      'location.within': '5mi',
      'location.latitude': '34.2321',
      'location.longitude': '-119.0752'
    };

    this.apiService.observe(testParams)
    .subscribe(data => {
      console.log(data);
    });


  }
  ngOnDestroy() {
    clearInterval(this.intervalReference);
  }

}
