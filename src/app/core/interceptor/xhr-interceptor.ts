import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import { HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { LoaderService } from '../service/loader.service';

export const xhrInterceptorFn: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  const loaderService = inject(LoaderService);

  // Set up delay times for showing and hiding the spinner
  const delayBeforeShowing = 200;  // 200ms delay before showing the spinner
  const delayBeforeHiding = 200;   // 200ms delay before hiding the spinner

  // Spinner counter to manage overlapping requests
  let spinnerCounter = 0;

  // Increment the counter when a new request starts
  spinnerCounter++;
  console.error('xhr starting', spinnerCounter);

  // Delay the spinner show and initiate it
  setTimeout(() => {
    if (spinnerCounter > 0) {  // Only show the spinner when the first request starts
      loaderService.show();
    }
  }, delayBeforeShowing);

  req = req.clone({
    withCredentials: true,
    headers: req.headers.set('X-Requested-With', 'XMLHttpRequest')
  });

  return next(req).pipe(
    tap(() => {
      // Success case: HTTP request completed successfully
    }),
    catchError((error) => {
      // Handle error case: if the request fails
      return of(error);  // You can customize error handling here if needed
    }),
    finalize(() => {
      // Decrement the counter when the request completes (success or error)
      spinnerCounter--;
      console.error('finalize counter', spinnerCounter);

      // If no more requests are active, hide the spinner after a delay
      if (spinnerCounter === 0) {
        console.error('counter == 0');
        setTimeout(() => {
          console.error('inside timeout:', spinnerCounter);
          loaderService.hide();
        }, delayBeforeHiding);
      }
    })
  );
};
