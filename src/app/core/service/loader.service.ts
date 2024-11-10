import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private _visible = new BehaviorSubject<boolean>(false);
  visible$ = this._visible.asObservable();  // Public observable for components to subscribe to

  show() {
    if (!this._visible.getValue()) {  // Check if the current value is false
      this._visible.next(true);       // Set it to true to show the spinner
      console.log('Spinner shown');   // Replace with actual spinner logic
    }
  }

  hide() {
    if (this._visible.getValue()) {   // Check if the current value is true
      this._visible.next(false);      // Set it to false to hide the spinner
      console.log('Spinner hidden');  // Replace with actual spinner logic
    }
  }
}
