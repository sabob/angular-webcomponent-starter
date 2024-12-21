import {bootstrapApplication, createApplication} from '@angular/platform-browser';
import {appConfig} from './app/app.config';
import {AppComponent} from './app/app.component';
import {createCustomElement} from '@angular/elements';
import {Properties} from './app/core/store/Properties';
import {provideRouter, Router} from "@angular/router";
import {routes} from './app/app.routes';
import {environment} from './environments/environment';

// the environment.ts files are used to set if the app must run as an angular app, or wc
let runAsWebComponent = environment.wc;

if (runAsWebComponent) {
  createApplication(appConfig)
    .then((app) => {

      const props = app.injector.get(Properties);
      props.skipLocationChange = runAsWebComponent;
      props.lazyLoad = !runAsWebComponent;

      // Create the custom element from the AppComponent
      const myComponent = createCustomElement(AppComponent, {injector: app.injector});

      // Define the custom element with the name 'my-wc'
      customElements.define('my-wc', myComponent);

      const router = app.injector.get(Router);
      router.navigate(['/'], {skipLocationChange: true});

    })
    .catch((err) => console.error(err));

} else {
  const extendedAppConfig = {
    ...appConfig,
    providers: [
      ...appConfig.providers,  // Include original providers
      provideRouter(
        routes,
        //withDisabledInitialNavigation()
      )
    ]
  };

  bootstrapApplication(AppComponent, extendedAppConfig)
    .then((appRef) => {
      const props = appRef.injector.get(Properties);
      props.skipLocationChange = runAsWebComponent;
    });
}
