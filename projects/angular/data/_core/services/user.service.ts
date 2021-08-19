import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, forkJoin, Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { HttpServiceConfig, HTTP_SERVICE_CONFIG } from '../configs';
import { User, Attempt, RequestOptions } from '../models';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public items: BehaviorSubject<User[]>;
  public loading: BehaviorSubject<boolean>;

  constructor(
    @Inject(HTTP_SERVICE_CONFIG) private config: HttpServiceConfig,
    public httpClient: HttpClient
  ) {
    this.items = new BehaviorSubject<User[]>([]);
    this.loading = new BehaviorSubject<boolean>(false);
  }

  list(options?: RequestOptions): Observable<User[]> {
    this.loading.next(true);

    let attempts = [];
    let listUsers = this.httpClient.get<Attempt<User[]>>(
      `${this.config.identityServerUrl}/users`,
      options?.getRequestOptions()
    );
    let apiUsers = this.httpClient.get<Attempt<User[]>>(
      `${this.config.apiUrl}/users`,
      options?.getRequestOptions()
    );

    attempts.push(listUsers);
    attempts.push(apiUsers);

    return forkJoin(attempts).pipe(
      map((response: Attempt<any[]>[]) => {
        let usersAttempt = response[0];
        let brandUsersAttempt = response[1];

        if (usersAttempt.failure) return undefined;

        let users: User[] = [];
        usersAttempt.result.forEach((user: User) => {
          let brandUser = brandUsersAttempt.result.find(
            (brandUser: User) => brandUser.id === user.id
          );
          users.push({ ...brandUser, ...user });
        });

        this.items.next(users);
        return users;
      }),
      finalize(() => this.loading.next(false))
    );
  }

  get(
    id: string,
    includeApiUser: boolean = true,
    options?: RequestOptions
  ): Observable<User> {
    this.loading.next(true);

    let attempts = [];
    let getUser = this.httpClient.get<Attempt<User>>(
      `${this.config.identityServerUrl}/users/${id}`,
      options?.getRequestOptions()
    );

    attempts.push(getUser);

    if (includeApiUser) {
      let requestOptions = new RequestOptions(true);
      let apiUser = this.httpClient.get<Attempt<User>>(
        `${this.config.apiUrl}/users/${id}`,
        requestOptions.getRequestOptions() // Always try to silently get the api user
      );
      attempts.push(apiUser);
    }

    return forkJoin(attempts).pipe(
      map((response: Attempt<User>[]) => {
        let userAttempt = response[0];

        if (userAttempt.failure) return undefined;

        let user = userAttempt.result;

        if (!includeApiUser) return user;

        let apiUserAttempt = response[1];
        let apiUser = apiUserAttempt.result;

        if (this.config.debug) console.log('apiUser', apiUser);
        if (this.config.debug) console.log('user', user);

        user = { ...apiUser, ...user };

        return user;
      }),
      finalize(() => this.loading.next(false))
    );
  }

  current(options?: RequestOptions): any {
    return this.httpClient
      .get<Attempt<any>>(
        `${this.config.identityServerUrl}/users/current`,
        options?.getRequestOptions()
      )
      .pipe(
        map((response: Attempt<any>) => {
          if (response.failure) return response.result;
          return response.result;
        })
      );
  }

  create(item: any, options?: RequestOptions): Observable<User> {
    return this.httpClient
      .post<Attempt<User>>(
        `${this.config.identityServerUrl}/users`,
        item,
        options?.getRequestOptions()
      )
      .pipe(
        map((response: Attempt<User>) => {
          if (response.failure) return response.result;
          const newItem = response.result;
          const items = this.items.value;
          items.push(newItem);
          this.items.next(items);
          return response.result;
        })
      );
  }

  update(item: User, options?: RequestOptions): Observable<User> {
    return this.httpClient
      .put<Attempt<User>>(
        `${this.config.identityServerUrl}/users`,
        item,
        options?.getRequestOptions()
      )
      .pipe(
        map((response: Attempt<User>) => {
          if (response.failure) return response.result;
          const newItem = response.result;
          const items = this.items.value;
          this.remove(items, newItem.id);
          items.push(newItem);
          this.items.next(items);
          return response.result;
        })
      );
  }

  delete(id: string, options?: RequestOptions): Observable<boolean> {
    var attempts = [];
    var deleteIdentity = this.httpClient.delete<Attempt<boolean>>(
      `${this.config.identityServerUrl}/users/${id}`,
      options?.getRequestOptions()
    );
    let requestOptions = new RequestOptions(true);
    var deleteUser = this.httpClient.delete<Attempt<boolean>>(
      `${this.config.apiUrl}/users/${id}`,
      requestOptions.getRequestOptions() // Always try to silently delete the api user
    );

    attempts.push(deleteIdentity);
    attempts.push(deleteUser);

    return forkJoin(attempts).pipe(
      map((response: Attempt<boolean>[]) => {
        const items = this.items.value;
        this.remove(items, id);
        this.items.next(items);
        let success = true;
        response.forEach((attempt: Attempt<boolean>) => {
          if (attempt.success) return;
          success = attempt.success;
        });
        return success;
      })
    );
  }

  private remove(items: User[], id: string) {
    items.forEach((item, i) => {
      if (item.id !== id) {
        return;
      }
      items.splice(i, 1);
    });
  }
}
