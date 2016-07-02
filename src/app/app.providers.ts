import { HTTP_PROVIDERS } from '@angular/http';
import { ApiService } from './shared/services/api.service';
import { SearchParamsService } from './shared/services/search-params.service';
import { GlobalEventsService } from './shared/services/global-events.service';

export const APP_PROVIDERS = [
    HTTP_PROVIDERS,
    ApiService,
    SearchParamsService,
    GlobalEventsService
];
