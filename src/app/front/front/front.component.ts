import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { NavbarComponent } from '../components/navbar/navbar.component';

@Component({
  moduleId: module.id,
  selector: 'app-front',
  templateUrl: 'front.component.html',
  styleUrls: ['front.component.css'],
  directives: [
    ROUTER_DIRECTIVES,
    NavbarComponent
]
})
export class FrontComponent implements OnInit {

  constructor() {}

  ngOnInit() {
  }

}
