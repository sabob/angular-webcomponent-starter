import {bootstrapApplication, createApplication} from '@angular/platform-browser';
import {appConfig} from './app/app.config';
import {AppComponent} from './app/app.component';
import {createCustomElement} from '@angular/elements';
import {Router} from "@angular/router";

let runAsWebComponent = true;

if (runAsWebComponent) {
  createApplication(appConfig)
    .then((app) => {

      // Create the custom element from the AppComponent
      const myComponent = createCustomElement(AppComponent, {injector: app.injector});

      // Define the custom element with the name 'test-wc'
      customElements.define('my-wc', myComponent);

      const router = app.injector.get(Router);
      //router.initialNavigation(); // WC specific with browser F5
      router.navigate(['/']);

      // Bootstrap the application with the existing appConfig
      //let boot = bootstrapApplication(AppComponent, appConfig);
      //return boot;

    })
    .catch((err) => console.error(err));

} else {
  bootstrapApplication(AppComponent, appConfig);
}

// (async () => {
//     const app = await createApplication({
//         providers: [
//             /* your global providers here */
//         ],
//     });
//
//     const tradeinComponent = createCustomElement(AppComponent, { injector: app.injector });
//
//     customElements.define("my-wc", tradeinComponent);
// })();
