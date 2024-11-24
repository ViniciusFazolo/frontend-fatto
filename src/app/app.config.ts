import { ApplicationConfig, LOCALE_ID } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';
import {
  BrowserAnimationsModule,
  provideAnimations,
} from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';

import ptBr from '@angular/common/locales/pt';

registerLocaleData(ptBr);
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    BrowserModule,
    BrowserAnimationsModule,
    provideAnimations(),
    provideHttpClient(),
    {provide: LOCALE_ID, useValue: 'pt-br' }
  ],
};
