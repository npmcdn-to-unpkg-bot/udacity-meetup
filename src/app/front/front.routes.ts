import { RouterConfig } from '@angular/router';
import { FrontComponent }   from './front/front.component';
import { HomeComponent } from './+home/home.component';
import { DefaultPageComponent } from './+default-page/default-page.component';
import { EventComponent } from './+event/event.component';

export const frontRoutes: RouterConfig = [
  {
    path: '',
    component: FrontComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'event/:id', component: EventComponent },
      { path: 'terms', component: DefaultPageComponent },
      { path: 'privacy', component: DefaultPageComponent },
      { path: '**', redirectTo: '' }
    ]
  }
];

