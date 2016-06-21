import { Component } from '@angular/core';
import { NavbarComponent } from './components/navbar/index';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  directives: [NavbarComponent]
})
export class AppComponent {
  title = 'app works!';
}
