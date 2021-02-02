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

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    @Inject(PLATFORM_ID) private platformId,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (isPlatformServer(this.platformId)) return next.handle(request);

    return next.handle(request).pipe(
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
  }
}
