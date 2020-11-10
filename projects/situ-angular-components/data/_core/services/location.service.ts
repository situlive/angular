import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { finalize, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { HttpServiceConfig, HTTP_SERVICE_CONFIG } from '../configs';
import { Location, Attempt } from '../models';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class LocationService extends BaseService<Location> {
  constructor(
    @Inject(HTTP_SERVICE_CONFIG) public config: HttpServiceConfig,
    httpClient: HttpClient
  ) {
    super(config, 'locations', httpClient);
  }

  list(theatreId: number): Observable<Location[]> {
    this.loading.next(true);
    return this.httpClient
      .get<Attempt<Location[]>>(
        `${this.config.apiUrl}/theatres/${theatreId}/locations`
      )
      .pipe(
        map((response: Attempt<Location[]>) => {
          this.items.next(response.result);
          return response.result;
        }),
        finalize(() => this.loading.next(false))
      );
  }
}
