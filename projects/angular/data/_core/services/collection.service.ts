import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { finalize, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { HttpServiceConfig, HTTP_SERVICE_CONFIG } from '../configs';
import { FavouriteCollection, Attempt, RequestOptions } from '../models';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class CollectionService extends BaseService<FavouriteCollection> {
  constructor(
    @Inject(HTTP_SERVICE_CONFIG) public config: HttpServiceConfig,
    public httpClient: HttpClient
  ) {
    super(config, 'collections', httpClient);
  }

  list(options?: RequestOptions): Observable<FavouriteCollection[]> {
    this.loading.next(true);

    return this.httpClient
      .get<Attempt<FavouriteCollection[]>>(
        `${this.config.apiUrl}/collections`,
        options?.getRequestOptions()
      )
      .pipe(
        map((response: Attempt<FavouriteCollection[]>) => {
          if (response.failure) return response.result;
          this.items.next(response.result);
          return response.result;
        }),
        finalize(() => this.loading.next(false))
      );
  }
}
