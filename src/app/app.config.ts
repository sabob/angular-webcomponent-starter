import {APP_INITIALIZER, ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {
  PreloadAllModules,
  provideRouter,
  withDisabledInitialNavigation,
  withPreloading
} from '@angular/router';
import {Location} from "@angular/common";
import {routes} from './app.routes';
import {provideHttpClient} from "@angular/common/http";
import {provideAnimations} from "@angular/platform-browser/animations";

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes,
      //withDisabledInitialNavigation(),
      withPreloading(PreloadAllModules)
    ),
    provideAnimations(),
    provideHttpClient(),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeAppFactory,
      multi: true,
      deps: [Location]
    }
  ]
};

export function initializeAppFactory(location: Location) {
  return () => initializeApp(location);
}

async function initializeApp(location: Location) {

  try {
    // show loader
    // TODO, initialize app here, eg call /context for bootstrap info

  } catch (err: any) {

    console.error("app could not initialize", err);
    return Promise.resolve(false);

  } finally {
    // hide loader
  }
  return Promise.resolve(true);
  //return Promise.reject("Could not init");
}
