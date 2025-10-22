import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './AuthModule/interceptors/auth-interceptor';
import { httpErrorInterceptor } from './AuthModule/interceptors/http-error.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),

    provideHttpClient(
      withInterceptors([
        authInterceptor,
        httpErrorInterceptor,
        // loggingInterceptor,
        // errorInterceptor
      ])
    ),

    provideRouter(routes)]
};
