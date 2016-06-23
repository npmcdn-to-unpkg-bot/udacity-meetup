import { RouterConfig } from '@angular/router';

import { FrontComponent }   from './front/front.component';
import { HomeComponent } from './+home/home.component';
import { ContactComponent } from './+contact/contact.component';

export const FrontRoutes: RouterConfig = [
  { 
    path: '',
    component: FrontComponent,
    children: [
      { path:'',  component: HomeComponent },
      { path:'about',  component: HomeComponent },
      { path:'contact',  component: ContactComponent }
      
    ]
  }
];

