import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { finalize, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { HttpServiceConfig, HTTP_SERVICE_CONFIG } from '../configs';
import { Item, Attempt, RequestOptions } from '../models';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class ItemService extends BaseService<Item> {
  constructor(
    @Inject(HTTP_SERVICE_CONFIG) public config: HttpServiceConfig,
    httpClient: HttpClient
  ) {
    super(config, 'items', httpClient);
  }

  list(options?: RequestOptions): Observable<Item[]> {
    this.loading.next(true);
    return this.httpClient
      .get<Attempt<Item[]>>(
        `${this.config.apiUrl}/items`,
        options?.getRequestOptions()
      )
      .pipe(
        map((response: Attempt<Item[]>) => {
          if (response.failure) return response.result;
          let items = response.result;
          this.items.next(items);
          return items;
        }),
        finalize(() => this.loading.next(false))
      );
  }
}
