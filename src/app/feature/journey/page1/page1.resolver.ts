import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import {Observable, of} from 'rxjs';

@Injectable({ providedIn: 'root' })
export class Page1Resolver implements Resolve<any> {
  constructor() {}

  resolve(): Observable<any> {
    console.log("Resolve page1 data");
     const staticData = { key: 'value', anotherKey: 'anotherValue' };
    return of(staticData); // Wrap static data in an observable
  }
}
