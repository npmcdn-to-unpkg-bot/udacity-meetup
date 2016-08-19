import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { FooterComponent } from '../components/footer/footer.component';
import { ApiService } from '../../shared/services/api.service';

@Component({
  moduleId: module.id,
  selector: 'app-front',
  templateUrl: 'front.component.html',
  styleUrls: ['front.component.scss'],
  directives: [
    ROUTER_DIRECTIVES,
    NavbarComponent,
    FooterComponent
]
})
export class FrontComponent implements OnInit {
  constructor(private apiService: ApiService) {}
  ngOnInit() {
    this.apiService.loadEvents();
  }
}
