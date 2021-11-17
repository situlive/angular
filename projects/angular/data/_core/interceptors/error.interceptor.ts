import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformServer } from '@angular/common';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';

import { NotificationService } from '../services';
import { HttpServiceConfig, HTTP_SERVICE_CONFIG } from '../configs';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    @Inject(PLATFORM_ID) private platformId,
    @Inject(HTTP_SERVICE_CONFIG) private config: HttpServiceConfig,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (isPlatformServer(this.platformId)) return next.handle(request);

    if (this.config.debug)
      console.log(
        '--------------------- ERROR INTERCEPTOR START ---------------------'
      );

    if (this.config.debug) console.log(request);

    if (request.headers.has('Silent-Request')) {
      if (this.config.debug)
        console.log(
          'handling a silent request, return errors has undefined',
          request.url
        );
      const headers = request.headers.delete('Silent-Request');
      const directRequest = request.clone({ headers });
      return next.handle(directRequest).pipe(
        map((response: any) => response),
        catchError(() => undefined)
      );
    }

    if (this.config.debug)
      console.log('this is not a silent request', request.url);

    const snapshot = this.router.routerState.snapshot;
    const handle = next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse && event.body) {
          let body = event.body;
          let failed = body.failure;
          let error = body.error;
          let message = failed ? error.message : body.message;

          if (message)
            this.notificationService.add({
              message,
              type: failed ? 'mat-warning' : 'mat-success',
            });
        }

        if (this.config.debug)
          console.log('Are we on the login page?', snapshot.url === '/login');

        return event;
      }),
      catchError((error) => {
        switch (error.status) {
          case 403:
            this.notificationService.add({
              message:
                'You do not have sufficient permssions to perform this action. If you feel this is erroneous, please contact your system administrator.',
              type: 'mat-warning',
            });
            break;
          case 401:
            if (snapshot.url === '/login') break;

            this.router.navigate([
              '/login',
              { queryParams: { returnUrl: this.router.url } },
            ]); // Redirect and remember the return url
            break;
          default:
            let message = '';

            if (error.error instanceof ErrorEvent) {
              // Client-side
              message = `Error: ${error.error.message}`;
            } else if (error.error) {
              message = error.error;
            } else {
              // Server-side
              message = `Error code: ${error.status}\nMessage: ${error.message}`;
            }
            this.notificationService.add({ message, type: 'mat-danger' });
            break;
        }

        return throwError(error);
      })
    );

    if (this.config.debug)
      console.log(
        '--------------------- ERROR INTERCEPTOR END ---------------------'
      );

    return handle;
  }
}
