import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { finalize, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { HttpServiceConfig, HTTP_SERVICE_CONFIG } from '../configs';
import { Zone, Attempt, RequestOptions } from '../models';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class ZoneService extends BaseService<Zone> {
  constructor(
    @Inject(HTTP_SERVICE_CONFIG) public config: HttpServiceConfig,
    httpClient: HttpClient
  ) {
    super(config, 'zones', httpClient);
  }

  list(venueId: number, options?: RequestOptions): Observable<Zone[]> {
    this.loading.next(true);
    return this.httpClient
      .get<Attempt<Zone[]>>(
        `${this.config.apiUrl}/venues/${venueId}/zones`,
        options?.getRequestOptions()
      )
      .pipe(
        map((response: Attempt<Zone[]>) => {
          if (response.failure) return response.result;
          this.items.next(response.result);
          return response.result;
        }),
        finalize(() => this.loading.next(false))
      );
  }
}
