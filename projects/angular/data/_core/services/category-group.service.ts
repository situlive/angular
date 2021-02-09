import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { HttpServiceConfig, HTTP_SERVICE_CONFIG } from '../configs';
import { Attempt, Group, RequestOptions } from '../models';

@Injectable({
  providedIn: 'root',
})
export class CategoryGroupService {
  public items: BehaviorSubject<Group[]>;
  public loading: BehaviorSubject<boolean>;

  constructor(
    @Inject(HTTP_SERVICE_CONFIG) private config: HttpServiceConfig,
    public httpClient: HttpClient
  ) {
    this.items = new BehaviorSubject<Group[]>([]);
    this.loading = new BehaviorSubject<boolean>(false);
  }

  list(categoryId: number, options?: RequestOptions): Observable<Group[]> {
    this.loading.next(true);

    return this.httpClient
      .get<Attempt<Group[]>>(
        `${this.config.apiUrl}/categories/${categoryId}/groups`,
        options?.getRequestOptions()
      )
      .pipe(
        map((response: Attempt<Group[]>) => {
          if (response.failure) return response.result;
          let groups = response.result;
          this.items.next(groups);
          return groups;
        }),
        finalize(() => this.loading.next(false))
      );
  }

  create(
    categoryId: number,
    item: Group,
    options?: RequestOptions
  ): Observable<Group> {
    return this.httpClient
      .post<Attempt<Group>>(
        `${this.config.apiUrl}/categories/${categoryId}/groups`,
        {
          categoryId,
          groupId: item.id,
        },
        options?.getRequestOptions()
      )
      .pipe(
        map((response: Attempt<Group>) => {
          if (response.failure) return response.result;
          const items = this.items.value;
          items.push(item);
          this.items.next(items);
          return response.result;
        })
      );
  }

  delete(
    categoryId: number,
    id: number,
    options?: RequestOptions
  ): Observable<boolean> {
    return this.httpClient
      .delete<Attempt<boolean>>(
        `${this.config.apiUrl}/categories/${categoryId}/groups/${id}`,
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

  private remove(items: Group[], id: number) {
    items.forEach((item, i) => {
      if (item.id !== id) {
        return;
      }
      items.splice(i, 1);
    });
  }
}
