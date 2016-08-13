import { RouterConfig } from '@angular/router';

import { FrontComponent }   from './front/front.component';
import { HomeComponent } from './+home/home.component';
import { EventComponent } from './+event/event.component';
import { ContactComponent } from './+contact/contact.component';

export const frontRoutes: RouterConfig = [
  {
    path: '',
    component: FrontComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'event/:id', component: EventComponent },
      { path: 'about', component: HomeComponent },
      { path: 'contact', component: ContactComponent },
      { path: '**', redirectTo: '' }
    ]
  }
];

