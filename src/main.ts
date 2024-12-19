import {bootstrapApplication, createApplication} from '@angular/platform-browser';
import {appConfig} from './app/app.config';
import {AppComponent} from './app/app.component';
import {createCustomElement} from '@angular/elements';
import {Properties} from './app/core/store/Properties';
import {provideRouter, Router} from "@angular/router";
import {routes} from './app/app.routes';
import {environment} from './environments/environment';

console.log(environment.production); // Example usage
console.log("-----------------------------------------", environment)

let runAsWebComponent = environment.wc;

(window as any).myapp = (window as any).myapp || {};
if (runAsWebComponent) {
  (window as any).myapp.wc = true;
  createApplication(appConfig)
    .then((app) => {

      const props = app.injector.get(Properties);
      props.skipLocationChange = runAsWebComponent;
      props.lazyLoad = !runAsWebComponent;

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
  (window as any).myapp.wc = false;
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
