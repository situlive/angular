import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, forkJoin, Observable } from 'rxjs';
import { finalize, map, mergeMap } from 'rxjs/operators';

import { HttpServiceConfig, HTTP_SERVICE_CONFIG } from '../configs';
import { BrandUser, Attempt, User, RequestOptions, ApiUser } from '../models';

@Injectable({
  providedIn: 'root',
})
export class BrandUserService {
  public items: BehaviorSubject<BrandUser[]>;
  public loading: BehaviorSubject<boolean>;

  constructor(
    @Inject(HTTP_SERVICE_CONFIG) private config: HttpServiceConfig,
    public httpClient: HttpClient
  ) {
    this.items = new BehaviorSubject<BrandUser[]>([]);
    this.loading = new BehaviorSubject<boolean>(false);
  }

  list(brandId: number): Observable<BrandUser[]> {
    this.loading.next(true);

    const attempts = [];
    const listUsers = this.httpClient.get<Attempt<User[]>>(
      `${this.config.identityServerUrl}/users`
    );
    const options = new RequestOptions(true);
    const listBrandUsers = this.httpClient.get<Attempt<BrandUser[]>>(
      `${this.config.apiUrl}/brands/${brandId}/users`,
      options.getRequestOptions()
    );

    attempts.push(listUsers);
    attempts.push(listBrandUsers);

    return forkJoin(attempts).pipe(
      map((response: Attempt<User[] | BrandUser[]>[]) => {
        const usersAttempt = <Attempt<User[]>>response[0];
        const brandUsersAttempt = <Attempt<BrandUser[]>>response[1];

        if (usersAttempt.failure || brandUsersAttempt.failure) return undefined;

        const brandUsers = brandUsersAttempt.result;
        const users: BrandUser[] = [];
        usersAttempt.result.forEach((user: User) => {
          const brandUser = brandUsers.find(
            (item: BrandUser) => item.userId === user.id
          );
          if (!brandUser) return;

          users.push({
            ...brandUser,
            ...{
              image: user.image,
              jobTitle: user.jobTitle,
              firstName: user.firstName,
              lastName: user.lastName,
              userName: user.userName,
            },
          });
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
    const request: BrandUser = {
      brandId: brandId,
      userId: item.id,
      confirmed: item.confirmed,
      domain: item.userName.split('@')[1],
    };
    const observables = [];

    observables.push(
      this.httpClient.post<Attempt<BrandUser>>(
        `${this.config.apiUrl}/brands/${brandId}/users`,
        request,
        options?.getRequestOptions()
      )
    );
    observables.push(
      this.httpClient.get<Attempt<User>>(
        `${this.config.identityServerUrl}/users/${item.id}`
      )
    );

    return <Observable<BrandUser>>forkJoin(observables).pipe(
      map((response: Attempt<BrandUser | User>[]) => {
        var branduserAttempt = <Attempt<BrandUser>>response[0];
        var userAttempt = <Attempt<User>>response[1];

        if (branduserAttempt.failure) return branduserAttempt.result;
        if (userAttempt.failure) return userAttempt.result;

        const user = userAttempt.result;
        const brandUser = {
          ...branduserAttempt.result,
          ...{
            userId: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            jobTitle: user.jobTitle,
            image: user.image,
            userName: user.userName,
          },
        };

        const items = this.items.value;
        items.push(brandUser);
        this.items.next(items);
        return brandUser;
      })
    );
  }

  update(request: BrandUser, options?: RequestOptions): Observable<BrandUser> {
    return this.httpClient
      .put<Attempt<BrandUser>>(
        `${this.config.apiUrl}/brands/${request.brandId}/users`,
        request,
        options?.getRequestOptions()
      )
      .pipe(
        map((response: Attempt<BrandUser>) => {
          if (response.failure) return response.result;
          const brandUser = response.result;
          const items = this.items.value;

          items.forEach((user: BrandUser) => {
            if (user.id !== brandUser.id) return;
            user.confirmed = brandUser.confirmed;
          });

          this.items.next(items);
          return brandUser;
        })
      );
  }

  delete(
    brandId: number,
    id: number,
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
          this.items.next(items);
          return response.result;
        })
      );
  }

  private remove(items: BrandUser[], id: number) {
    items.forEach((item, i) => {
      if (item.id !== id) {
        return;
      }
      items.splice(i, 1);
    });
  }
}
