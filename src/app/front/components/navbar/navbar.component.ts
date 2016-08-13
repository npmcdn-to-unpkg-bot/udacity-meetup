import { Component, OnInit, Renderer } from '@angular/core';
import { DROPDOWN_DIRECTIVES, CollapseDirective } from 'ng2-bootstrap';
import { ROUTER_DIRECTIVES, Router, NavigationEnd } from '@angular/router';
import { PageScroll } from 'ng2-page-scroll';
import { GlobalEventsService } from '../../../shared/services/global-events.service';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  moduleId: module.id,
  selector: 'app-navbar',
  templateUrl: 'navbar.component.html',
  styleUrls: ['navbar.component.css'],
  directives: [DROPDOWN_DIRECTIVES, CollapseDirective, ROUTER_DIRECTIVES, PageScroll]
})
export class NavbarComponent implements OnInit {
  public isCollapsed: boolean = true;
  constructor(
    public globalEventsService: GlobalEventsService,
    public authService: AuthService,
    private router: Router,
    private renderer: Renderer) {}

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isCollapsed = true;
      }
    }, (error: any) => {
      this.isCollapsed = true;
    });
  }

}
