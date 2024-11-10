import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize, catchError } from 'rxjs/operators';

@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {
  private requestCount = 0;
  private showSpinnerTimeout: any;
  private hideSpinnerTimeout: any;

  // Configurable delays in milliseconds
  private showDelay: number = 200; // Default show delay
  private hideDelay: number = 200; // Default hide delay

  constructor() {
    // Optionally, you can dynamically set these delays in the constructor
    // Example: this.showDelay = 500; this.hideDelay = 300;
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.incrementRequestCount();

    // If it's the first request, delay showing the spinner
    if (this.requestCount === 1) {
      this.showSpinnerWithDelay();
    }

    // Handle the HTTP request and response
    return next.handle(req).pipe(
      // This will add delay and finalize the spinner
      finalize(() => this.decrementRequestCount()),
      catchError((error) => {
        // Handle the error gracefully and decrement the counter
        return Observable.throw(error);
      })
    );
  }

  private incrementRequestCount(): void {
    this.requestCount++;
  }

  private decrementRequestCount(): void {
    this.requestCount--;
    if (this.requestCount === 0) {
      this.hideSpinnerWithDelay();
    }
  }

  private showSpinnerWithDelay(): void {
    // Ensure we don't show the spinner multiple times
    clearTimeout(this.showSpinnerTimeout);
    this.showSpinnerTimeout = setTimeout(() => {
      console.log('Spinner shown'); // Replace with actual spinner logic
      // Example: this.spinnerService.show();
    }, this.showDelay); // Use the configurable show delay
  }

  private hideSpinnerWithDelay(): void {
    // Only hide the spinner once all requests are completed
    clearTimeout(this.hideSpinnerTimeout);
    this.hideSpinnerTimeout = setTimeout(() => {
      console.log('Spinner hidden'); // Replace with actual spinner hiding logic
      // Example: this.spinnerService.hide();
    }, this.hideDelay); // Use the configurable hide delay
  }
}
