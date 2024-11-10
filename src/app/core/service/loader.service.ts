import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private _loaderCounter = 0; // Track active requests
  private _visible = new BehaviorSubject<boolean>(false); // Loader visibility
  visible$ = this._visible.asObservable(); // Observable for loader visibility

  // Delay settings for showing and hiding loader
  private delayBeforeShowing = 1200; // Delay before showing the loader
  private delayBeforeHiding = 200;  // Delay before hiding the loader

  // Timeout handles to manage clearing timeouts if called multiple times
  private showTimeoutHandle: any;
  private hideTimeoutHandle: any;

  show() {
    // Clear previous show timeout if it exists
    if (this.showTimeoutHandle) {
      clearTimeout(this.showTimeoutHandle);
    }

    // Wait for a delay before showing the loader
    this.showTimeoutHandle = setTimeout(() => {
      if (this._loaderCounter > 0) {
        this._visible.next(true); // Show the loader after delay
      }
    }, this.delayBeforeShowing);
  }

  hide() {
    // Clear previous hide timeout if it exists
    if (this.hideTimeoutHandle) {
      clearTimeout(this.hideTimeoutHandle);
    }

    // Wait for a delay before hiding the loader
    this.hideTimeoutHandle = setTimeout(() => {
      if (this._loaderCounter <= 0) {  // Ensure the counter is never negative
        this._loaderCounter = 0;  // Reset to 0 if it's negative
        this._visible.next(false); // Hide the loader after delay
      }
    }, this.delayBeforeHiding);
  }

  increment() {
    this._loaderCounter++; // Increment the counter
    this.show(); // Show the loader when a new request starts
  }

  decrement() {
    this._loaderCounter--; // Decrement the counter
    if (this._loaderCounter < 0) {  // Ensure it doesn't go negative
      this._loaderCounter = 0;  // Set to 0 if it's negat ive
    }

    if (this._loaderCounter === 0) {  // Only hide when no requests are active
      this .hide(); // Hide the loader when all requests are completed
    }
  }
}
