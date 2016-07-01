import { Component, ElementRef, OnInit, ViewEncapsulation } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { GlobalEventsService } from './shared/services/global-events.service';

import { APP_PROVIDERS } from './app.providers';

@Component({
  moduleId: module.id,
  encapsulation: ViewEncapsulation.None,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  directives: [ROUTER_DIRECTIVES],
  providers: [APP_PROVIDERS]
})
export class AppComponent implements OnInit {
  constructor(private globalEventsService: GlobalEventsService) {
    globalEventsService.init();
  }
  ngOnInit() {

  }

}
