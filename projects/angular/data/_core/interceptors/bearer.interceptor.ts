import { Inject, Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { HttpServiceConfig, HTTP_SERVICE_CONFIG } from '../configs';
import { AuthenticationService } from '@situlive/angular/authentication';

@Injectable()
export class BearerInterceptor implements HttpInterceptor {
  constructor(
    @Inject(HTTP_SERVICE_CONFIG) private config: HttpServiceConfig,
    private authenticationService: AuthenticationService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!request.url.startsWith('http') && !request.url.startsWith('www'))
      return next.handle(request); // Only process web requests

    if (this.config.debug)
      console.log(
        '--------------------- BEARER INTERCEPTOR START ---------------------'
      );

    const currentUser = this.authenticationService.getCurrent;
    const endpoints = this.config.endpoints;

    if (this.config.debug)
      console.log('currentUser', currentUser !== undefined);
    if (this.config.debug) console.log('endpoints', endpoints?.length);

    if (!currentUser || !currentUser.access_token) return next.handle(request); // If we are not logged in, don't add the bearer token
    if (
      request.url.indexOf(`${this.config.identityServerUrl}/connect/token`) > -1
    )
      return next.handle(request); // If we are trying to log in, don't add the bearer token

    if (endpoints) {
      let match = endpoints.find((url: string) =>
        url.indexOf('*') > -1
          ? request.url.indexOf(url.substr(0, url.length - 2)) > -1
          : request.url === url
      );

      if (this.config.debug) console.log('match', request.url);

      if (!match) return next.handle(request);
    }

    if (this.config.debug)
      console.log(
        'we have found a match or we have not specified any endpoints, so add bearer'
      );

    request = request.clone({
      headers: request.headers.set(
        'Authorization',
        `Bearer ${currentUser.access_token}`
      ),
    });

    if (this.config.debug) console.log(request);

    if (this.config.debug)
      console.log(
        '--------------------- BEARER INTERCEPTOR END ---------------------'
      );

    this.authenticationService.slideExpiration();

    return next.handle(request); // If we have no matches
  }
}