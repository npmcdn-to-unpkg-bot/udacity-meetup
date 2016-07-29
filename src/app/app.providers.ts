import { HTTP_PROVIDERS } from '@angular/http';
import { ApiService } from './shared/services/api.service';
import { SearchParamsService } from './shared/services/search-params.service';
import { GlobalEventsService } from './shared/services/global-events.service';
import { provideLazyMapsAPILoaderConfig, GOOGLE_MAPS_PROVIDERS } from 'angular2-google-maps/core';

export const APP_PROVIDERS = [
    HTTP_PROVIDERS,
    ApiService,
    SearchParamsService,
    GlobalEventsService,
    GOOGLE_MAPS_PROVIDERS,
    provideLazyMapsAPILoaderConfig({
        apiKey: 'AIzaSyBE1Bb86PEGx-11LahjWCZS2cFOWMpNseI',
        libraries: ['places']
    })
];
