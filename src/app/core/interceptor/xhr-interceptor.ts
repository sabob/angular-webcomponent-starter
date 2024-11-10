import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import { HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { LoaderService } from '../service/loader.service';

export const xhrInterceptorFn: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  const loaderService = inject(LoaderService);

  // Increment the counter when a new request starts
  loaderService.increment();

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
      return of(error);  // Customize error handling if needed
    }),
    finalize(() => {
      // Decrement the counter when the request completes (success or error)
      loaderService.decrement();
    })
  );
};
