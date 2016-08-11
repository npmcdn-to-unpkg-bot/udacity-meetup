import { FORM_PROVIDERS } from  '@angular/common';
import { HTTP_PROVIDERS } from '@angular/http';
import { ApiService } from './shared/services/api.service';
import { AuthService } from './shared/services/auth.service';
import { SearchParamsService } from './shared/services/search-params.service';
import { GlobalEventsService } from './shared/services/global-events.service';
import { EasterEggService } from './shared/services/easter-egg.service';
import { provideLazyMapsAPILoaderConfig, GOOGLE_MAPS_PROVIDERS } from 'angular2-google-maps/core';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

export const APP_PROVIDERS = [
    FORM_PROVIDERS,
    HTTP_PROVIDERS,
    ApiService,
    AuthService,
    SearchParamsService,
    GlobalEventsService,
    EasterEggService,
    GOOGLE_MAPS_PROVIDERS,
    SlimLoadingBarService,
    provideLazyMapsAPILoaderConfig({
        apiKey: 'AIzaSyBE1Bb86PEGx-11LahjWCZS2cFOWMpNseI',
        libraries: ['places']
    })
];
