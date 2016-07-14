import { Component, Input, ChangeDetectionStrategy} from '@angular/core';
import { CleanDatesPipe } from '../../../shared/pipes/clean-dates.pipe';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { ApiService } from '../../../shared/services/api.service';

@Component({
  moduleId: module.id,
  selector: 'app-events',
  templateUrl: 'events.component.html',
  styleUrls: ['events.component.css'],
  pipes: [CleanDatesPipe],
  directives: [ROUTER_DIRECTIVES]
})
export class EventsComponent {
  public events = [];
  constructor(public apiService: ApiService) {
    this.events = apiService.events$;
  }

}
