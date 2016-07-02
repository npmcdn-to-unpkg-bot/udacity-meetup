import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { EventsComponent } from '../components/events/index';
import { AutofocusDirective } from '../../shared/directives/autofocus.directive';
import { ApiService } from '../../shared/services/api.service';
import { GlobalEventsService } from '../../shared/services/global-events.service';

declare let Vimeo: any;

@Component({
  moduleId: module.id,
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css'],
  directives: [EventsComponent, AutofocusDirective]
})
export class HomeComponent implements OnInit, OnDestroy {
  public video: any;
  public searchFixed = false;
  public events;
  @ViewChild('videoContainer') videoContainer;
  private intervalReference;
  private yPos = 0;
  private minScroll = 999999;
  constructor(
    private apiService: ApiService,
    private globalEventsService: GlobalEventsService) {}

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
      this.events = data;
    });

    this.getMinScroll();
    this.globalEventsService.resize$.subscribe(data => {
      this.getMinScroll();
    });
    this.globalEventsService.scroll$.subscribe(data => {
      this.yPos = data.path[1].pageYOffset;
      this.updateFixed();
    });
  }

  ngOnDestroy() {
    clearInterval(this.intervalReference);
  }

  getMinScroll() {
    let winHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    // This is how far down the search bar is before any scrolling
    let vcHeight = this.videoContainer.nativeElement.offsetHeight;
    let vcTop = this.videoContainer.nativeElement.offsetTop;
    // search bar height is 22px
    this.minScroll = (0.49 * vcHeight) + vcTop + 22 - (0.017 * winHeight);
    this.updateFixed();
  }
  updateFixed() {
    if (this.yPos >= this.minScroll) {
      this.searchFixed = true;
    } else {
      this.searchFixed = false;
    }
  }
}
