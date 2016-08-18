import { Component, ViewEncapsulation, ViewContainerRef, OnInit } from '@angular/core';
import {ROUTER_DIRECTIVES, Router, NavigationEnd} from '@angular/router';
import { GlobalEventsService } from './shared/services/global-events.service';
import { BrowserSupportService } from './shared/services/browser-support.service';
import { EasterEggService } from './shared/services/easter-egg.service';
import { NewEventComponent } from './shared/components/new-event/index';
import { AuthContainerComponent } from './shared/components/auth-container/index';
import { SlimLoadingBarComponent, SlimLoadingBarService } from 'ng2-slim-loading-bar';

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
    AuthContainerComponent,
    SlimLoadingBarComponent
  ],
  providers: [APP_PROVIDERS]
})
export class AppComponent implements OnInit {
  constructor(
    private globalEventsService: GlobalEventsService,
    private browserSupportService: BrowserSupportService,
    private viewContainerRef: ViewContainerRef,
    private easterEggService: EasterEggService,
    private slimLoader: SlimLoadingBarService,
    private router: Router) {
    // TODO: if Safari explain all of the missing .js.map files with this link
    // https://github.com/angular/angular-cli/issues/706
  }

  public ngOnInit(): void {
    this.globalEventsService.init();
    this.browserSupportService.detect();
    this.easterEggService.init();
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.runSlimLoader();
      }
    }, (error: any) => {
      this.slimLoader.complete();
    });
  }

  private runSlimLoader(): void {
      this.slimLoader.start();
      setTimeout(() => this.slimLoader.progress = 14, 200);
      setTimeout(() => this.slimLoader.progress = 17, 400);
      setTimeout(() => this.slimLoader.progress = 20, 500);
      setTimeout(() => this.slimLoader.complete(), 800);
  }

}
