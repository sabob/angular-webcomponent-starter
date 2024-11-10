import {Routes} from '@angular/router';
import {Page1Guard} from "./feature/journey/page1/page1.guard";
import {Page1Resolver} from "./feature/journey/page1/page1.resolver";

export const routes: Routes = [

  {path: '', redirectTo: '/page1', pathMatch: 'full'},

  {
    path: 'page1',    
    loadComponent: () => import("./feature/journey/page1/page1.component").then((m) => m.Page1Component),
    //component: Page1Component,
    canActivate: [Page1Guard], // Protects route with AuthGuard
    resolve: {data: Page1Resolver} // Preloads data before activation
  },

  {
    path: 'page2',

    loadComponent: () => import("./feature/journey/page2/page2.component").then((m) => m.Page2Component),
    //component: Page2Component
  }
  
];
