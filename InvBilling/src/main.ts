import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { APP_CONFIG } from './app/tokens/app-config.token';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    ...appConfig.providers // merge your app config providers if needed
  ]
}).catch(err => console.error(err));



fetch('/assets/config.json')
  .then(res => res.json())
  .then(config => {
    bootstrapApplication(AppComponent, {
      ...appConfig,
      providers: [
        ...appConfig.providers,
        { provide: APP_CONFIG, useValue: config }
      ]
    });
  });


