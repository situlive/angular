import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { finalize, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { HttpServiceConfig, HTTP_SERVICE_CONFIG } from '../configs';
import { BaseService } from './base.service';
import { Attempt, Mapping, RequestOptions } from '../models';

@Injectable({
  providedIn: 'root',
})
export class MappingService extends BaseService<Mapping> {
  constructor(
    @Inject(HTTP_SERVICE_CONFIG) public config: HttpServiceConfig,
    httpClient: HttpClient
  ) {
    super(config, 'fieldmaps', httpClient);
  }

  list(feedId: number, options?: RequestOptions): Observable<Mapping[]> {
    this.loading.next(true);
    return this.httpClient
      .get<Attempt<Mapping[]>>(
        `${this.config.apiUrl}/feeds/${feedId}/fields`,
        options?.getRequestOptions()
      )
      .pipe(
        map((response: Attempt<Mapping[]>) => {
          if (response.failure) return response.result;
          this.items.next(response.result);
          return response.result;
        }),
        finalize(() => this.loading.next(false))
      );
  }
}
