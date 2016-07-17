import { Component, OnInit, OnDestroy, ViewChild, AfterViewChecked } from '@angular/core';
import { EventsComponent } from '../components/events/index';
import { AutofocusDirective } from '../../shared/directives/autofocus.directive';
import { ApiService } from '../../shared/services/api.service';
import { GlobalEventsService } from '../../shared/services/global-events.service';
import { PaginatePipe, IPaginationInstance, PaginationService } from 'ng2-pagination';

declare let Vimeo: any;

@Component({
  moduleId: module.id,
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css'],
  directives: [EventsComponent, AutofocusDirective],
  providers: [PaginationService]
})
export class HomeComponent implements OnInit, OnDestroy, AfterViewChecked {
  public video: any;
  public searchFixed = false;
  public events;
  public vcHeight;
  public loaded: boolean = false;
  @ViewChild('videoContainer') videoContainer;
  private intervalReference;
  private yPos = 0;
  private minScroll = 999999;
  private scrollUpdateNeeded: boolean = false;
  constructor(
    private apiService: ApiService,
    private globalEventsService: GlobalEventsService) {}

  getDimensions() {
    let winHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    // This is how far down the search bar is before any scrolling
    let vcTop = this.videoContainer.nativeElement.offsetTop;
    // search bar height is 22px
    this.minScroll = 260 + vcTop + 22 - (0.017 * winHeight);
    this.vcHeight = this.videoContainer.nativeElement.offsetHeight;
    this.updateFixed();
  }

  updateFixed() {
    if (this.yPos >= this.minScroll) {
      this.searchFixed = true;
    } else {
      this.searchFixed = false;
    }
  }
  
  onInput() {
    this.scrollUpdateNeeded = true;
  }

  ngOnInit() {
    let iframe = document.getElementById('hero-video');
    this.video = new Vimeo.Player(iframe);
    this.video.on('loaded', data => {
        setTimeout( () => {
          this.loaded = true;
        }, 2500);
    });
    
    this.intervalReference = setInterval( () => {
      this.video.setCurrentTime(231);
    }, 15000);

    this.getDimensions();
    this.globalEventsService.resize$.subscribe(data => {
      this.getDimensions();
    });
    this.globalEventsService.scroll$.subscribe( () => {
      this.yPos = document.body.scrollTop;
      this.updateFixed();
    });
  }

  ngOnDestroy() {
    clearInterval(this.intervalReference);
  }

  ngAfterViewChecked() {
    // http://stackoverflow.com/a/35493028/5357459
    if (this.scrollUpdateNeeded) {
      if (document.body.scrollTop === this.vcHeight) {
        this.scrollUpdateNeeded = false;
      } else {
        document.body.scrollTop = this.vcHeight;
      }
    }    
  }

}
