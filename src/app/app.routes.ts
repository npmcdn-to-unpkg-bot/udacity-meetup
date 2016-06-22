import { provideRouter, RouterConfig } from '@angular/router';

import { FrontRoutes } from './front/front.routes';

const appRoutes: RouterConfig = [
  ...FrontRoutes
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(appRoutes)
];