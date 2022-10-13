import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { finalize, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { HttpServiceConfig, HTTP_SERVICE_CONFIG } from '../configs';
import { RecommendationAnswer, Attempt, RequestOptions } from '../models';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class RecommendationAnswerService extends BaseService<RecommendationAnswer> {
  constructor(
    @Inject(HTTP_SERVICE_CONFIG) public config: HttpServiceConfig,
    httpClient: HttpClient
  ) {
    super(config, 'recommendation-answers', httpClient);
  }

  list(
    categoryId: number,
    options?: RequestOptions
  ): Observable<RecommendationAnswer[]> {
    this.loading.next(true);

    let url = `${this.config.apiUrl}/recommendation-questions/${categoryId}/answers`;
    if (options?.skip || options?.take)
      url += `?skip=${options.skip}&take=${options.take}`;

    return this.httpClient
      .get<Attempt<RecommendationAnswer[]>>(url, options?.getRequestOptions())
      .pipe(
        map((response: Attempt<RecommendationAnswer[]>) => {
          if (response.failure) return response.result;
          var items = response.result;
          this.items.next(items);
          return response.result;
        }),
        finalize(() => this.loading.next(false))
      );
  }
}
