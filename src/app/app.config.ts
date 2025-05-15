import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideImgixLoader } from '@angular/common';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

export const appConfig: ApplicationConfig = {

  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideClientHydration(withEventReplay()),provideImgixLoader('https://my.base.url/'),importProvidersFrom(FormsModule),provideHttpClient(withFetch())]
};

// This is the main configuration for the application. It imports the necessary modules and sets up the providers for routing, client hydration, image loading, and HTTP client with fetch support. The FormsModule is also imported to enable template-driven forms in the application.