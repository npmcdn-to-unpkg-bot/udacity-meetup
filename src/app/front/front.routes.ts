import { RouterConfig } from '@angular/router';

import { FrontComponent }   from './front/front.component';
import { HomeComponent } from './+home/home.component';

export const FrontRoutes: RouterConfig = [
  { 
    path: '',
    component: FrontComponent,
    children: [
      { path:'home',  component: HomeComponent }
    ]
  }
];

