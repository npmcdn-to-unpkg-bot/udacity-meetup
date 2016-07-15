import { Component, Input, ChangeDetectionStrategy} from '@angular/core';
import { CleanDatesPipe } from '../../../shared/pipes/clean-dates.pipe';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { ApiService } from '../../../shared/services/api.service';
import { PaginatePipe, IPaginationInstance } from 'ng2-pagination';
import { PaginationComponent } from '../pagination/index';

@Component({
  moduleId: module.id,
  selector: 'app-events',
  templateUrl: 'events.component.html',
  styleUrls: ['events.component.css'],
  pipes: [CleanDatesPipe, PaginatePipe],
  directives: [ROUTER_DIRECTIVES, PaginationComponent]
})
export class EventsComponent {
  public events = [];
  public config: IPaginationInstance = {
      id: 'custom',
      itemsPerPage: 9,
      currentPage: 1
  };
  constructor(public apiService: ApiService) {
    this.events = apiService.events$;
  }

}
