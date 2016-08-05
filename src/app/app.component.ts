import { Component, ViewEncapsulation, ViewContainerRef } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { GlobalEventsService } from './shared/services/global-events.service';
import { NewEventComponent } from './shared/components/new-event/index';
import { AuthContainerComponent } from './shared/components/auth-container/index';

import { APP_PROVIDERS } from './app.providers';

@Component({
  moduleId: module.id,
  encapsulation: ViewEncapsulation.None,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  directives: [
    ROUTER_DIRECTIVES,
    NewEventComponent,
    AuthContainerComponent
  ],
  providers: [APP_PROVIDERS]
})
export class AppComponent {
  constructor(private globalEventsService: GlobalEventsService, private viewContainerRef: ViewContainerRef) {
    globalEventsService.init();
    // TODO: if Safari explain all of the missing .js.map files with this link
    // https://github.com/angular/angular-cli/issues/706
  }
}
