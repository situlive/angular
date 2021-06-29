import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { finalize, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { HttpServiceConfig, HTTP_SERVICE_CONFIG } from '../configs';
import { Warehouse, Attempt, RequestOptions } from '../models';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class WarehouseService extends BaseService<Warehouse> {
  constructor(
    @Inject(HTTP_SERVICE_CONFIG) public config: HttpServiceConfig,
    public httpClient: HttpClient
  ) {
    super(config, 'warehouses', httpClient);
  }

  list(venueId: number, options?: RequestOptions): Observable<Warehouse[]> {
    this.loading.next(true);
    return this.httpClient
      .get<Attempt<Warehouse[]>>(
        `${this.config.apiUrl}/venues/${venueId}/warehouses`,
        options?.getRequestOptions()
      )
      .pipe(
        map((response: Attempt<Warehouse[]>) => {
          if (response.failure) return response.result;
          var items = response.result;
          this.items.next(items);
          return response.result;
        }),
        finalize(() => this.loading.next(false))
      );
  }
}
