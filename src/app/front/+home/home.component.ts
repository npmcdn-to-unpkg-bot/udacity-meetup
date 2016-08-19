import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ViewChild,
  AfterViewChecked,
  Renderer
} from '@angular/core';
import { EventsComponent } from '../components/events/index';
import { ApiService } from '../../shared/services/api.service';
import { GlobalEventsService } from '../../shared/services/global-events.service';
import { PaginationService } from 'ng2-pagination';
import { Router, NavigationEnd } from '@angular/router';
declare let Vimeo: any;

@Component({
  moduleId: module.id,
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.scss'],
  directives: [EventsComponent],
  providers: [PaginationService]
})
export class HomeComponent implements OnInit, AfterViewInit, AfterViewChecked, OnDestroy {
  @ViewChild('videoContainer') videoContainer;
  @ViewChild('searchContainer') searchContainer;
  @ViewChild('search') search;
  @ViewChild('videoSection') videoSection;
  public video: any;
  public searchFixed: boolean = false;
  public events: Array<Object>;
  public vcHeight: number;
  public loaded: boolean = false;
  public searchBarTabIndex: number = 12;
  private intervalReference: number;
  private yPos: number = 0;
  private minScroll: number = 999999;
  private scrollUpdateNeeded: boolean = false;

  constructor(
    public globalEventsService: GlobalEventsService,
    private apiService: ApiService,
    private router: Router,
    private renderer: Renderer) {}

  public onInput(): void {
    // Moves scroll position on next digest cycle
    this.scrollUpdateNeeded = true;
  }

  public manuelFocus(): void {
    this.renderer.invokeElementMethod(
      this.search.nativeElement, 'focus', []);
  }

  public ngOnInit(): void {
    this.backgroundVideoInit();
    // Set listeners related to fixing the search bar
    this.getDimensions();
    this.globalEventsService.elementsCollection.resize.emitter$.subscribe(data => {
      this.getDimensions();
    });
    this.globalEventsService.elementsCollection.scroll.emitter$.subscribe( () => {
      this.yPos = document.body.scrollTop;
      this.updateFixed();
    });
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.manuelFocus();
      }
    }, (error: any) => {
      this.manuelFocus();
    });
  }

  public ngAfterViewInit(): void {
    this.manuelFocus();
  }

  public ngAfterViewChecked(): void {
    this.updateScrollPosition();
  }

  public ngOnDestroy(): void {
    clearInterval(this.intervalReference);
  }

  /**
   * Background Video
   * docs: https://github.com/vimeo/player.js
   */
  private backgroundVideoInit() {
    let iframe = document.getElementById('hero-video');
    if (iframe !== undefined && iframe !== null) {
      this.video = new Vimeo.Player(iframe);
      this.video.on('loaded', data => {
          // TODO: this is not working in all browsers
          this.video.setVolume(0);
          setTimeout( () => {
            this.loaded = true;
          }, 2500);
      });
      // Restart video periodically
      this.intervalReference = setInterval( () => {
        this.video.setCurrentTime(231);
      }, 15000);
    }
  }

  /**
   * Get dimensions related to fixing the search bar
   */
  private getDimensions(): void {
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
  private updateFixed(): void {
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
  private updateScrollPosition(): void {
    if (this.scrollUpdateNeeded) {
      if (document.body.scrollTop === this.vcHeight) {
        this.scrollUpdateNeeded = false;
      } else {
        document.body.scrollTop = this.vcHeight;
      }
    }
  }

}
