import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformServer } from '@angular/common';
import { HttpParams, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

import * as jwt_decode from 'jwt-decode';

import { Token } from '../models/token';
import { AUTH_CONFIG } from '../configs/auth-config.token';
import { AuthConfig } from '../configs/auth-config';
import { TransferHttpService } from './transfer-http.service';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<Token>;

  constructor(
    @Inject(PLATFORM_ID) private platformId,
    @Inject(AUTH_CONFIG) private config: AuthConfig,
    private http: TransferHttpService
  ) {
    this.currentUserSubject = new BehaviorSubject<Token>(
      JSON.parse(
        isPlatformServer(this.platformId)
          ? '{}'
          : localStorage.getItem('currentUser')
      )
    );
  }

  public get getCurrent(): Token {
    return this.currentUserSubject.value;
  }

  login() {
    const params = new HttpParams({
      fromObject: {
        grant_type: this.config.grantType,
        scope: this.config.scopes,
      },
    });

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: this.config.basicAuthorization,
      }),
    };

    return this.http
      .post(
        `${this.config.identityServerUrl}/connect/token`,
        params,
        httpOptions
      )
      .pipe(
        map((response: any) => {
          const decoded = jwt_decode(response.access_token);
          response.name = decoded.name;
          response.firstName = decoded.given_name;
          response.lastName = decoded.family_name;
          response.userId = decoded.sub;
          response.expires = decoded.exp * 1000;
          response.role = decoded.role;
          localStorage.setItem('currentUser', JSON.stringify(response));
          this.currentUserSubject.next(response);
          return response;
        })
      );
  }
}
