import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
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
