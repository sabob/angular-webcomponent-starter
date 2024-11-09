import {bootstrapApplication, createApplication} from '@angular/platform-browser';
import {appConfig} from './app/app.config';
import {AppComponent} from './app/app.component';
import {createCustomElement} from '@angular/elements';
import { Properties } from './app/core/store/Properties';
import {Router} from "@angular/router";
import {routes} from './app/app.routes';
import {withDisabledInitialNavigation, provideRouter, withPreloading} from '@angular/router';

let runAsWebComponent = true;

if (runAsWebComponent) {
  createApplication(appConfig)
    .then((app) => {

        const props = app.injector.get(Properties);
        props.skipLocationChange = runAsWebComponent;

      // Create the custom element from the AppComponent
      const myComponent = createCustomElement(AppComponent, {injector: app.injector});

      // Define the custom element with the name 'test-wc'
      customElements.define('my-wc', myComponent);

      const router = app.injector.get(Router);
      //router.initialNavigation(); // WC specific with browser F5
      router.navigate(['/'], {skipLocationChange: true});

      // Bootstrap the application with the existing appConfig
      //let boot = bootstrapApplication(AppComponent, appConfig);
      //return boot;

    })
    .catch((err) => console.error(err));

} else {


// Extend appConfig to include withDisabledInitialNavigation()

  // Extend appConfig to include withDisabledInitialNavigation()
const extendedAppConfig = {
  ...appConfig,
  providers: [
    ...appConfig.providers,  // Include original providers
    provideRouter(
        routes,
        //withDisabledInitialNavigation()
    )  // Apply withDisabledInitialNavigation()
  ]
};

  bootstrapApplication(AppComponent, extendedAppConfig)
    .then((appRef) => {
      const props = appRef.injector.get(Properties);
        props.skipLocationChange = runAsWebComponent;
    });
}
