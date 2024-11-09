import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';

@Injectable({providedIn: 'root'})
export class Page1Guard implements CanActivate {
  constructor(private router: Router) {
  }

  canActivate(): boolean {
    const isAuthenticated = true;

    console.log("CanActivate page1?", isAuthenticated)
    return isAuthenticated;
  }
}
