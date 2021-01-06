import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { finalize, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { HttpServiceConfig, HTTP_SERVICE_CONFIG } from '../configs';
import { Subscription, Attempt } from '../models';
import { BaseService } from './base.service';
import { ListOptions } from '../models/list-options';

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

  list(options?: ListOptions): Observable<Subscription[]> {
    this.loading.next(true);

    let url = `${this.config.apiUrl}/subscriptions`;
    if (options) url += `?skip=${options.skip}&take=${options.take}`;

    return this.httpClient.get<Attempt<Subscription[]>>(url).pipe(
      map((response: Attempt<Subscription[]>) => {
        this.items.next(response.result);
        return response.result;
      }),
      finalize(() => this.loading.next(false))
    );
  }
}
