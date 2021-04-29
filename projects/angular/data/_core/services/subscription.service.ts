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
    return this.httpClient
      .get<Attempt<Subscription[]>>(
        `${this.config.apiUrl}/subscriptions`,
        options?.getRequestOptions()
      )
      .pipe(
        map((response: Attempt<Subscription[]>) => {
          if (response.failure) return response.result;
          var items = response.result;
          this.items.next(items);
          return response.result;
        }),
        finalize(() => this.loading.next(false))
      );
  }

  cancel(id: number, options?: RequestOptions): Observable<Subscription> {
    return this.httpClient
      .delete<Attempt<Subscription>>(
        `${this.config.apiUrl}/${this.endpoint}/${id}/cancel`,
        options?.getRequestOptions()
      )
      .pipe(
        map((response: Attempt<Subscription>) => {
          if (response.failure) return response.result;
          const newItem = response.result;
          const items = this.items.value;
          items.forEach((item: Subscription) => {
            if (item.id !== newItem.id) return;
            item = { ...item, ...newItem };
          });
          return response.result;
        })
      );
  }
}
