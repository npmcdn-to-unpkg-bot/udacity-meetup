import { Component, ElementRef, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { APP_PROVIDERS } from './app.providers';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  directives: [ROUTER_DIRECTIVES],
  providers: [APP_PROVIDERS]
})
export class AppComponent implements OnInit {
  constructor() {

  }
  ngOnInit() {
   
  }

}
