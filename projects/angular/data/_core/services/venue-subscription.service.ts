import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { finalize, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { HttpServiceConfig, HTTP_SERVICE_CONFIG } from '../configs';
import { Subscription, Attempt, RequestOptions } from '../models';
import { SubscriptionService } from './subscription.service';

@Injectable({
  providedIn: 'root',
})
export class VenueSubscriptionService extends SubscriptionService {
  constructor(
    @Inject(HTTP_SERVICE_CONFIG) public config: HttpServiceConfig,
    public httpClient: HttpClient
  ) {
    super(config, httpClient);
  }

  listVenueSubscriptions(
    venueId: number,
    options?: RequestOptions
  ): Observable<Subscription[]> {
    this.loading.next(true);

    let url = `${this.config.apiUrl}/venues/${venueId}/subscriptions`;
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
}
