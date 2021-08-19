import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { finalize, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { HttpServiceConfig, HTTP_SERVICE_CONFIG } from '../configs';
import { Favourite, Attempt, RequestOptions } from '../models';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class FavouriteService extends BaseService<Favourite> {
  constructor(
    @Inject(HTTP_SERVICE_CONFIG) public config: HttpServiceConfig,
    public httpClient: HttpClient
  ) {
    super(config, 'favourites', httpClient);
  }

  list(id: number, options?: RequestOptions): Observable<Favourite[]> {
    this.loading.next(true);

    return this.httpClient
      .get<Attempt<Favourite[]>>(
        `${this.config.apiUrl}/collections/${id}/favourites`,
        options?.getRequestOptions()
      )
      .pipe(
        map((response: Attempt<Favourite[]>) => {
          if (response.failure) return response.result;
          this.items.next(response.result);
          return response.result;
        }),
        finalize(() => this.loading.next(false))
      );
  }
}
