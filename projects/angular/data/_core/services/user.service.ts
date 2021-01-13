import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, forkJoin, Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { HttpServiceConfig, HTTP_SERVICE_CONFIG } from '../configs';
import { User, Attempt } from '../models';

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

  list(): Observable<User[]> {
    this.loading.next(true);

    let attempts = [];
    let listUsers = this.httpClient.get<Attempt<User[]>>(
      `${this.config.identityServerUrl}/users`
    );
    let apiUsers = this.httpClient.get<Attempt<User[]>>(
      `${this.config.apiUrl}/users`
    );

    attempts.push(listUsers);
    attempts.push(apiUsers);

    return forkJoin(attempts).pipe(
      map((response: Attempt<any[]>[]) => {
        let usersAttempt = response[0];
        let brandUsersAttempt = response[1];

        if (usersAttempt.failure || brandUsersAttempt.failure) return undefined;

        let users: User[] = [];
        usersAttempt.result.forEach((user: User) => {
          let brandUser = brandUsersAttempt.result.find(
            (brandUser: User) => brandUser.id === user.id
          );
          users.push({ ...user, ...brandUser });
        });

        this.items.next(users);
        return users;
      }),
      finalize(() => this.loading.next(false))
    );
  }

  get(id: string, includeApiUser: boolean = true): Observable<User> {
    this.loading.next(true);

    let attempts = [];
    let getUser = this.httpClient.get<Attempt<User>>(
      `${this.config.identityServerUrl}/users/${id}`
    );
    let apiUser = this.httpClient.get<Attempt<User>>(
      `${this.config.apiUrl}/users/${id}`
    );

    attempts.push(getUser);

    if (includeApiUser) attempts.push(apiUser);

    return forkJoin(attempts).pipe(
      map((response: Attempt<User>[]) => {
        let userAttempt = response[0];

        if (userAttempt.failure) return undefined;

        let user = userAttempt.result;

        if (!includeApiUser) return user;

        let apiUserAttempt = response[1];
        let apiUser = apiUserAttempt.result;

        user = { ...user, ...apiUser };

        return user;
      }),
      finalize(() => this.loading.next(false))
    );
  }

  current(): any {
    return this.httpClient
      .get<Attempt<any>>(`${this.config.identityServerUrl}/users/current`)
      .pipe(
        map((response: Attempt<any>) => {
          if (response.failure) return response.result;
          return response.result;
        })
      );
  }

  create(item: User): Observable<User> {
    return this.httpClient
      .post<Attempt<User>>(`${this.config.identityServerUrl}/users`, item)
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

  update(item: User): Observable<User> {
    return this.httpClient
      .put<Attempt<User>>(`${this.config.identityServerUrl}/users`, item)
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

  delete(id: string): Observable<boolean> {
    var attempts = [];

    var deleteUser = this.httpClient.delete<Attempt<boolean>>(
      `${this.config.apiUrl}/users/${id}`
    );
    var deleteIdentity = this.httpClient.delete<Attempt<boolean>>(
      `${this.config.identityServerUrl}/users/${id}`
    );

    attempts.push(deleteUser);
    attempts.push(deleteIdentity);

    return forkJoin(attempts).pipe(
      map((response: Attempt<boolean>[]) => {
        const items = this.items.value;
        this.remove(items, id);
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
