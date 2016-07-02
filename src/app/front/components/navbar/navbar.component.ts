import { Component } from '@angular/core';
import { DROPDOWN_DIRECTIVES, CollapseDirective } from 'ng2-bootstrap';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { PageScroll } from 'ng2-page-scroll';

@Component({
  moduleId: module.id,
  selector: 'app-navbar',
  templateUrl: 'navbar.component.html',
  styleUrls: ['navbar.component.css'],
  directives: [DROPDOWN_DIRECTIVES, CollapseDirective, ROUTER_DIRECTIVES, PageScroll]
})
export class NavbarComponent {
  public isCollapsed: boolean = true;
  clicked(event) {
    event.preventDefault();
  }

}
