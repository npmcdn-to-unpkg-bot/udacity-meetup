import { Component, OnInit, Input } from '@angular/core';
import { EventsPipe } from '../../../shared/pipes/events.pipe';

@Component({
  moduleId: module.id,
  selector: 'app-events',
  templateUrl: 'events.component.html',
  styleUrls: ['events.component.css'],
  pipes: [EventsPipe]
})
export class EventsComponent implements OnInit {
  @Input() events = [];
  constructor() {}

  ngOnInit() {
  }

}
