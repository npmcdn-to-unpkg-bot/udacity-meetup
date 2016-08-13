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
export class HomeComponent implements OnInit, AfterViewChecked, OnDestroy {
  @ViewChild('videoContainer') videoContainer;
  @ViewChild('searchContainer') searchContainer;
  @ViewChild('videoSection') videoSection;
  public video:any;
  public searchFixed:boolean = false;
  public events: Array<Object>;
  public vcHeight:number;
  public lastManuelFocus:number;
  public loaded:boolean = false;
  public searchBarTabIndex:number = 12;
  private intervalReference:number;
  private yPos:number = 0;
  private minScroll:number = 999999;
  private scrollUpdateNeeded:boolean = false;
  
  constructor(
    public globalEventsService: GlobalEventsService,
    private apiService: ApiService) {}

  public onInput():void {
    // Moves scroll position on next digest cycle
    this.scrollUpdateNeeded = true;
  }

  public manuelFocus():void {
    let currentDate = new Date;
    this.lastManuelFocus = currentDate.getTime();
  }

  public ngOnInit():void {
    // Background Video
    let iframe = document.getElementById('hero-video');
    this.video = new Vimeo.Player(iframe);
    this.video.on('loaded', data => {
        setTimeout( () => {
          this.loaded = true;
        }, 2500);
    });
    // Restart video periodically
    this.intervalReference = setInterval( () => {
      this.video.setCurrentTime(231);
    }, 15000);
    // Set listeners related to fixing the search bar
    this.getDimensions();
    this.globalEventsService.elementsCollection['resize'].emitter$.subscribe(data => {
      this.getDimensions();
    });
    this.globalEventsService.elementsCollection['scroll'].emitter$.subscribe( () => {
      this.yPos = document.body.scrollTop;
      this.updateFixed();
    }); 
  }

  public ngAfterViewChecked():void {
    this.updateScrollPosition();
  }

  public ngOnDestroy():void {
    clearInterval(this.intervalReference);
  }

  /**
   * Get dimensions related to fixing the search bar
   */
  private getDimensions():void {
    // Window height
    let winHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    // Pixels below the top of the page (Desktop: 60px)
    let vcTop = this.videoContainer.nativeElement.offsetTop;
    // Pixels below `videoContainer` (Desktop: 260px)
    let searchContainerTop = this.searchContainer.nativeElement.offsetTop;
    // Minimum scroll distance before switching to a fixed search bar
    this.minScroll = searchContainerTop + vcTop + 22 - (0.017 * winHeight);
    this.vcHeight = this.videoSection.nativeElement.offsetHeight;
    this.updateFixed();
  }

  /**
   * Checks if the search bar should be fixed,
   * then changes a variable that changes the 
   * class via ngClass in the Html 
   */
  private updateFixed():void {
    if (this.yPos >= this.minScroll) {
      this.searchBarTabIndex = 7;
      this.searchFixed = true;
    } else {
      this.searchFixed = false;
      this.searchBarTabIndex = 12;
    }
  }

  /**
   * Move scroll position on input (workaround)
   * 
   * If the search bar recieves input (via `onInput()`),
   * then this function is continually called
   * (on each digest cycle via `ngAfterViewChecked()`)
   * to update the document's scroll position 
   * until the position actually changes.
   * http://stackoverflow.com/a/35493028/5357459
   */
  private updateScrollPosition():void {
    if (this.scrollUpdateNeeded) {
      if (document.body.scrollTop === this.vcHeight) {
        this.scrollUpdateNeeded = false;
      } else {
        document.body.scrollTop = this.vcHeight;
      }
    }
  }

}
