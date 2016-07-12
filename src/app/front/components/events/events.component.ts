import { Component, Input } from '@angular/core';
import { EventsPipe } from '../../../shared/pipes/events.pipe';
import { CleanDatesPipe } from '../../../shared/pipes/clean-dates.pipe';
import { ROUTER_DIRECTIVES } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'app-events',
  templateUrl: 'events.component.html',
  styleUrls: ['events.component.css'],
  pipes: [EventsPipe, CleanDatesPipe],
  directives: [ROUTER_DIRECTIVES]
})
export class EventsComponent {
  @Input() events = [];
}
