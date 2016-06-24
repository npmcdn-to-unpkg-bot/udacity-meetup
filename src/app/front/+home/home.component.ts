import { Component, OnInit, ElementRef } from '@angular/core';
import { EventsComponent } from '../components/events/index';
import { Autofocus } from '../../shared/autofocus.directive';

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
  constructor(public element: ElementRef) {}

  ngOnInit() {
    let iframe = document.getElementById('hero-video');
    this.video = new Vimeo.Player(iframe);
    this.intervalReference = setInterval( () => {
      this.video.setCurrentTime(231);
    }, 15000);
  }
  ngOnDestroy() {
    clearInterval(this.intervalReference);
  }

}
