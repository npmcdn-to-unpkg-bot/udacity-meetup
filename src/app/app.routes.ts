import { provideRouter, RouterConfig } from '@angular/router';

import { frontRoutes } from './front/front.routes';

const appRoutes: RouterConfig = [
  ...frontRoutes
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(appRoutes)
];
