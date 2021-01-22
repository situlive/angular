import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformServer } from '@angular/common';
import { HttpParams, HttpHeaders, HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import jwt_decode from 'jwt-decode';

import { Token } from '../models/token';
import { AuthConfig, AUTH_CONFIG } from '../configs';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  public currentUserSubject: BehaviorSubject<Token>; // Public, so we can trigger the currentUser subscriptions manually by invoking .next(getCurrent())
  public currentUser: Observable<Token>;

  public get getCurrent(): Token {
    return this.currentUserSubject.value;
  }

  constructor(
    @Inject(PLATFORM_ID) private platformId,
    @Inject(AUTH_CONFIG) private config: AuthConfig,
    private httpClient: HttpClient
  ) {
    this.currentUserSubject = new BehaviorSubject<Token>(
      JSON.parse(
        isPlatformServer(this.platformId)
          ? '{}'
          : localStorage.getItem('currentUser')
      )
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  addPassword(
    userId: string,
    token: string,
    password: string,
    confirmPassword: string
  ) {
    return this.setOrResetPassword(
      userId,
      token,
      password,
      confirmPassword,
      'confirm'
    );
  }

  public resetPassword(
    userId: string,
    token: string,
    password: string,
    confirmPassword: string
  ): Observable<any> {
    return this.httpClient.post<any>(
      `${this.config.identityServerUrl}/users/resetpassword`,
      {
        userId,
        token,
        password,
        confirmPassword,
      }
    );
  }

  public forgotPassword(
    Username: string,
    CallbackUrl: string
  ): Observable<any> {
    var data = {
      Username,
      CallbackUrl,
    };

    return this.httpClient.post<any>(
      `${this.config.identityServerUrl}/users/forgotpassword`,
      data
    );
  }

  public clientCredentialsLogin(): Observable<any> {
    const params = new HttpParams({
      fromObject: {
        grant_type: 'client_credentials',
        scope: this.config.scopes,
      },
    });

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: this.config.basicAuthorization,
      }),
    };

    return this.baseLogin(params, httpOptions);
  }

  public login(username: string, password: string): Observable<any> {
    const params = new HttpParams({
      fromObject: {
        username,
        password,
        grant_type: 'password',
        scope: this.config.scopes,
      },
    });

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: this.config.basicAuthorization,
      }),
    };

    return this.baseLogin(params, httpOptions);
  }

  public logout(): void {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  private baseLogin(params: HttpParams, httpOptions: any): Observable<any> {
    return this.httpClient
      .post(
        `${this.config.identityServerUrl}/connect/token`,
        params,
        httpOptions
      )
      .pipe(
        map((response: any) => {
          const decoded: any = jwt_decode(response.access_token);
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

  private setOrResetPassword(
    userId: string,
    token: string,
    password: string,
    confirmPassword: string,
    path: string
  ) {
    return this.httpClient.post<any>(
      `${this.config.identityServerUrl}/users/${path}`,
      {
        userId,
        token,
        password,
        confirmPassword,
        callbackUrl: `${location?.origin}/add-password`,
      }
    );
  }
}
