import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { finalize, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { HttpServiceConfig, HTTP_SERVICE_CONFIG } from '../configs';
import { Venue, Attempt, RequestOptions } from '../models';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class VenueService extends BaseService<Venue> {
  constructor(
    @Inject(HTTP_SERVICE_CONFIG) public config: HttpServiceConfig,
    httpClient: HttpClient
  ) {
    super(config, 'venues', httpClient);
  }

  list(options?: RequestOptions): Observable<Venue[]> {
    this.loading.next(true);
    return this.httpClient
      .get<Attempt<Venue[]>>(
        `${this.config.apiUrl}/venues`,
        options?.getRequestOptions()
      )
      .pipe(
        map((response: Attempt<Venue[]>) => {
          if (response.failure) return response.result;
          this.items.next(response.result);
          return response.result;
        }),
        finalize(() => this.loading.next(false))
      );
  }
}
