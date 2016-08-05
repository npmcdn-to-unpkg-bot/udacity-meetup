import { Component, OnInit, Input, ViewChild, ElementRef, Renderer } from '@angular/core';
import { REACTIVE_FORM_DIRECTIVES } from '@angular/forms';
import { MapsAPILoader } from 'angular2-google-maps/core'; 
import { GlobalEventsService } from '../../services/global-events.service';
declare var google: any;

@Component({
  moduleId: module.id,
  selector: 'app-textbox',
  templateUrl: 'textbox.component.html',
  styleUrls: ['textbox.component.css'],
  directives: [REACTIVE_FORM_DIRECTIVES]
})
export class TextboxComponent implements OnInit {
  @Input() field;
  @Input() tabindex;
  @Input() control;
  public timeout;
  constructor(
    private mapsApiLoader: MapsAPILoader,
    private globalEventsService: GlobalEventsService,
    private element: ElementRef,
    private renderer: Renderer) {}

  ngOnInit() {
    this.checkListeners();
  }

  public onInput(event, type):number {
    return event.target.value.length;
  }

  private checkListeners() {
    // Checks if this field should have event listeners
    // or other special functions called
    if ('addListener' in this.field) {
      if (this.field.addListener === 'location') {
        this.autocomplete();
      }
    }
  }

  private listenToModalScroll() {
    // If this componenent is a child of a `.slide`
    // element, then listen to that element's scroll event
    let a:any = this.element.nativeElement;
    let scrollElement = null;
    while (a) {
      if (a.classList !== undefined && a.classList.contains('slide')) {
        scrollElement = a;
        a = null;
      } else {
        a = a.parentNode;
      }
    }
    if (scrollElement) {
      this.globalEventsService.observeElement(scrollElement, 'scroll');
      let collectionItem = scrollElement.localName + 'scroll';
      this.globalEventsService.elementsCollection[collectionItem].emitter$.subscribe(data => {
        this.hideGoogleMapsAutocomplete();
      });
    }
  }

  private hideGoogleMapsAutocomplete() {
    // ** Workaround for modal scrolling **
    // 1) Hide autocomplete suggestions on scroll
    let gmElements:any = document.querySelectorAll('.pac-container');
    for (let i = 0; i < gmElements.length; i++) {
      gmElements[i].style.display = 'none';
    }
    // 2) After scrolling stops remove and reapply focus to move
    // autocomplete suggestions to the correct position
    clearTimeout(this.timeout);
    this.timeout = setTimeout( () => {
      if (this.element.nativeElement.firstElementChild === document.activeElement) {
        this.renderer.invokeElementMethod(
          this.element.nativeElement.firstElementChild, 'blur', []);
        this.renderer.invokeElementMethod(
          this.element.nativeElement.firstElementChild, 'focus', []);
      }
    }, 300);
  }

  private autocomplete():void {
    // Sets up Google Maps autocomplete suggestions
    this.listenToModalScroll();
    this.mapsApiLoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete( this.element.nativeElement.firstElementChild, {});
      google.maps.event.addListener(autocomplete, 'place_changed', () => {
          let place = autocomplete.getPlace();
          console.log(place);
      });
    });
  }

}
