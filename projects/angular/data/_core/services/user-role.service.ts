import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { HttpServiceConfig, HTTP_SERVICE_CONFIG } from '../configs';
import { Attempt, Role, RequestOptions } from '../models';

@Injectable({
  providedIn: 'root',
})
export class UserRoleService {
  public items: BehaviorSubject<Role[]>;
  public loading: BehaviorSubject<boolean>;

  constructor(
    @Inject(HTTP_SERVICE_CONFIG) private config: HttpServiceConfig,
    public httpClient: HttpClient
  ) {
    this.items = new BehaviorSubject<Role[]>([]);
    this.loading = new BehaviorSubject<boolean>(false);
  }

  list(userId: string, options?: RequestOptions): Observable<Role[]> {
    this.loading.next(true);

    return this.httpClient
      .get<Attempt<Role[]>>(
        `${this.config.identityServerUrl}/users/${userId}/roles`,
        options?.getRequestOptions()
      )
      .pipe(
        map((response: Attempt<Role[]>) => {
          if (response.failure) return response.result;
          let roles = response.result;
          this.items.next(roles);
          return roles;
        }),
        finalize(() => this.loading.next(false))
      );
  }

  create(
    userId: string,
    item: Role,
    options?: RequestOptions
  ): Observable<Role> {
    return this.httpClient
      .post<Attempt<Role>>(
        `${this.config.identityServerUrl}/users/${userId}/roles`,
        {
          userId,
          roleId: item.id,
        },
        options?.getRequestOptions()
      )
      .pipe(
        map((response: Attempt<Role>) => {
          if (response.failure) return response.result;
          const items = this.items.value;
          items.push(item);
          this.items.next(items);
          return response.result;
        })
      );
  }

  delete(
    userId: string,
    id: string,
    options?: RequestOptions
  ): Observable<boolean> {
    return this.httpClient
      .delete<Attempt<boolean>>(
        `${this.config.identityServerUrl}/users/${userId}/roles/${id}`,
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

  private remove(items: Role[], id: string) {
    items.forEach((item, i) => {
      if (item.id !== id) {
        return;
      }
      items.splice(i, 1);
    });
  }
}
