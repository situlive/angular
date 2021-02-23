import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, forkJoin, Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { HttpServiceConfig, HTTP_SERVICE_CONFIG } from '../configs';
import { BrandUser, Attempt, User, RequestOptions } from '../models';

@Injectable({
  providedIn: 'root',
})
export class BrandUserService {
  public items: BehaviorSubject<User[]>;
  public loading: BehaviorSubject<boolean>;

  constructor(
    @Inject(HTTP_SERVICE_CONFIG) private config: HttpServiceConfig,
    public httpClient: HttpClient
  ) {
    this.items = new BehaviorSubject<User[]>([]);
    this.loading = new BehaviorSubject<boolean>(false);
  }

  list(brandId: number): Observable<User[]> {
    this.loading.next(true);

    let attempts = [];
    let listUsers = this.httpClient.get<Attempt<User[]>>(
      `${this.config.identityServerUrl}/users`
    );
    let options = new RequestOptions(true);
    let listBrandUsers = this.httpClient.get<Attempt<BrandUser[]>>(
      `${this.config.apiUrl}/brands/${brandId}/users`,
      options.getRequestOptions()
    );

    attempts.push(listUsers);
    attempts.push(listBrandUsers);

    return forkJoin(attempts).pipe(
      map((response: Attempt<any[]>[]) => {
        let usersAttempt = response[0];
        let brandUsersAttempt = response[1];

        if (usersAttempt.failure || brandUsersAttempt.failure) return undefined;

        let users: User[] = [];
        usersAttempt.result.forEach((user: User) => {
          let brandUser = brandUsersAttempt.result.find(
            (brandUser: BrandUser) => brandUser.userId === user.id
          );
          if (!brandUser) return;
          users.push({ ...user, ...brandUser });
        });

        this.items.next(users);
        return users;
      }),
      finalize(() => this.loading.next(false))
    );
  }

  create(
    brandId: number,
    item: User,
    options?: RequestOptions
  ): Observable<BrandUser> {
    let brandUser: BrandUser = {
      brandId: brandId,
      userId: item.id,
      confirmed: item.confirmed,
      domain: item.userName.split('@')[1],
    };
    return this.httpClient
      .post<Attempt<BrandUser>>(
        `${this.config.apiUrl}/brands/${brandId}/users`,
        brandUser,
        options?.getRequestOptions()
      )
      .pipe(
        map((response: Attempt<BrandUser>) => {
          if (response.failure) return response.result;
          const items = this.items.value;
          items.push(item);
          this.items.next(items);
          return response.result;
        })
      );
  }

  update(
    brandId: number,
    item: User,
    options?: RequestOptions
  ): Observable<BrandUser> {
    let brandUser: BrandUser = {
      brandId: brandId,
      userId: item.id,
      confirmed: item.confirmed,
    };
    return this.httpClient
      .put<Attempt<BrandUser>>(
        `${this.config.apiUrl}/brands/${brandId}/users`,
        brandUser,
        options?.getRequestOptions()
      )
      .pipe(
        map((response: Attempt<BrandUser>) => {
          if (response.failure) return response.result;
          const items = this.items.value;
          let match = items.find((user: User) => user.id === item.id);
          if (!match) return response.result;
          match.confirmed = item.confirmed;
          this.items.next(items);
          return response.result;
        })
      );
  }

  delete(
    brandId: number,
    id: string,
    options?: RequestOptions
  ): Observable<boolean> {
    return this.httpClient
      .delete<Attempt<boolean>>(
        `${this.config.apiUrl}/brands/${brandId}/users/${id}`,
        options?.getRequestOptions()
      )
      .pipe(
        map((response: Attempt<boolean>) => {
          if (response.failure) return response.result;
          const items = this.items.value;
          this.remove(items, id);
          return response.result;
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
