import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { finalize, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { HttpServiceConfig, HTTP_SERVICE_CONFIG } from '../configs';
import { Attempt, Criterion, RequestOptions } from '../models';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class CriterionService extends BaseService<Criterion> {
  constructor(
    @Inject(HTTP_SERVICE_CONFIG) public config: HttpServiceConfig,
    public httpClient: HttpClient
  ) {
    super(config, 'criteria', httpClient);
  }

  list(
    categoryId: number,
    includes: string = '',
    options?: RequestOptions
  ): Observable<Criterion[]> {
    this.loading.next(true);
    return this.httpClient
      .get<Attempt<Criterion[]>>(
        `${this.config.apiUrl}/categories/${categoryId}/criteria`,
        {
          ...{ params: { includes } },
          ...options?.getRequestOptions(),
        }
      )
      .pipe(
        map((response: Attempt<Criterion[]>) => {
          if (response.failure) return response.result;
          this.items.next(response.result);
          return response.result;
        }),
        finalize(() => this.loading.next(false))
      );
  }
}
