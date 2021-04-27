import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { HttpServiceConfig, HTTP_SERVICE_CONFIG } from '../configs';
import { SubscriptionLine, Attempt, RequestOptions } from '../models';

@Injectable({
  providedIn: 'root',
})
export class SubscriptionLineService {
  public items: BehaviorSubject<SubscriptionLine[]>;
  public loading: BehaviorSubject<boolean>;

  constructor(
    @Inject(HTTP_SERVICE_CONFIG) private config: HttpServiceConfig,
    public httpClient: HttpClient
  ) {
    this.items = new BehaviorSubject<SubscriptionLine[]>([]);
    this.loading = new BehaviorSubject<boolean>(false);
  }

  list(
    subscriptionId: number,
    options?: RequestOptions
  ): Observable<SubscriptionLine[]> {
    this.loading.next(true);

    return this.httpClient
      .get<Attempt<SubscriptionLine[]>>(
        `${this.config.apiUrl}/subscriptions/${subscriptionId}/lines`,
        options?.getRequestOptions()
      )
      .pipe(
        map((response: Attempt<SubscriptionLine[]>) => {
          if (response.failure) return response.result;
          this.items.next(response.result);
          return response.result;
        }),
        finalize(() => this.loading.next(false))
      );
  }

  create(
    model: SubscriptionLine,
    options?: RequestOptions
  ): Observable<SubscriptionLine> {
    return this.httpClient
      .post<Attempt<SubscriptionLine>>(
        `${this.config.apiUrl}/subscriptions/${model.subscriptionId}/lines`,
        model,
        options?.getRequestOptions()
      )
      .pipe(
        map((response: Attempt<SubscriptionLine>) => {
          if (response.failure) return response.result;
          const items = this.items.value;
          items.push(response.result);
          this.items.next(items);
          return response.result;
        })
      );
  }

  update(
    model: SubscriptionLine,
    options?: RequestOptions
  ): Observable<SubscriptionLine> {
    return this.httpClient
      .put<Attempt<SubscriptionLine>>(
        `${this.config.apiUrl}/subscriptions/${model.subscriptionId}/lines`,
        model,
        options?.getRequestOptions()
      )
      .pipe(
        map((response: Attempt<SubscriptionLine>) => {
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

  delete(
    subscriptionId: number,
    id: number,
    options?: RequestOptions
  ): Observable<boolean> {
    return this.httpClient
      .delete<Attempt<boolean>>(
        `${this.config.apiUrl}/subscriptions/${subscriptionId}/lines/${id}`,
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

  private remove(items: SubscriptionLine[], id: number) {
    items.forEach((item, i) => {
      if (item.id !== id) {
        return;
      }
      items.splice(i, 1);
    });
  }
}
