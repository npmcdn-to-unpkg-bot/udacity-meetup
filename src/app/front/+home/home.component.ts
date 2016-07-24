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
export class HomeComponent implements OnInit, AfterViewChecked, OnDestroy  {
  @ViewChild('videoContainer') videoContainer;
  
  public video: any;
  public searchFixed: boolean = false;
  public events: Array<Object>;
  public vcHeight: number;
  public lastManuelFocus: number;
  public loaded: boolean = false;
  
  private intervalReference: number;
  private yPos: number = 0;
  private minScroll: number = 999999;
  private scrollUpdateNeeded: boolean = false;
  
  constructor(
    public globalEventsService: GlobalEventsService,
    private apiService: ApiService) {}

  private getDimensions(): void {
    let winHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    // This is how far down the search bar is before any scrolling
    let vcTop = this.videoContainer.nativeElement.offsetTop;
    // search bar height is 22px
    this.minScroll = 260 + vcTop + 22 - (0.017 * winHeight);
    this.vcHeight = this.videoContainer.nativeElement.offsetHeight;
    this.updateFixed();
  }

  private updateFixed(): void {
    if (this.yPos >= this.minScroll) {
      this.searchFixed = true;
    } else {
      this.searchFixed = false;
    }
  }
  
  public onInput(): void {
    this.scrollUpdateNeeded = true;
  }

  public manuelFocus(): void {
    let currentDate = new Date;
    this.lastManuelFocus = currentDate.getTime();
  }

  ngOnInit() {
    this.apiService.checkEmail('meow@dog.com').subscribe( data => console.log(data) );
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

  ngOnDestroy() {
    clearInterval(this.intervalReference);
  }

  

}
