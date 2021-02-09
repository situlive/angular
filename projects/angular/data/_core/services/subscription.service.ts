import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { finalize, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { HttpServiceConfig, HTTP_SERVICE_CONFIG } from '../configs';
import { Subscription, Attempt, RequestOptions } from '../models';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class SubscriptionService extends BaseService<Subscription> {
  constructor(
    @Inject(HTTP_SERVICE_CONFIG) public config: HttpServiceConfig,
    public httpClient: HttpClient
  ) {
    super(config, 'subscriptions', httpClient);
  }

  list(options?: RequestOptions): Observable<Subscription[]> {
    this.loading.next(true);

    let url = `${this.config.apiUrl}/${this.endpoint}`;
    if (options?.skip || options?.take)
      url += `?skip=${options.skip}&take=${options.take}`;

    return this.httpClient
      .get<Attempt<Subscription[]>>(url, options?.getRequestOptions())
      .pipe(
        map((response: Attempt<Subscription[]>) => {
          if (response.failure) return response.result;
          this.items.next(response.result);
          return response.result;
        }),
        finalize(() => this.loading.next(false))
      );
  }

  cancel(id: number, options?: RequestOptions): Observable<Subscription> {
    return this.httpClient
      .delete<Attempt<Subscription>>(
        `${this.config.apiUrl}/${this.endpoint}/${id}`,
        options?.getRequestOptions()
      )
      .pipe(
        map((response: Attempt<Subscription>) => {
          if (response.failure) return response.result;
          const newItem = response.result;
          const items = this.items.value;
          this.removeFromSubscription(items, newItem.id);
          items.push(newItem);
          this.items.next(items);
          return response.result;
        })
      );
  }

  private removeFromSubscription(items: Subscription[], id: number | string) {
    items.forEach((item, i) => {
      if (item.id !== id) {
        return;
      }
      items.splice(i, 1);
    });
  }
}
