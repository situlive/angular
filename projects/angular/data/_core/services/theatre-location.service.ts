import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { finalize, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { HttpServiceConfig, HTTP_SERVICE_CONFIG } from '../configs';
import { Location, Attempt, RequestOptions } from '../models';
import { LocationService } from './location.service';

@Injectable({
  providedIn: 'root',
})
export class TheatreLocationService extends LocationService {
  constructor(
    @Inject(HTTP_SERVICE_CONFIG) public config: HttpServiceConfig,
    public httpClient: HttpClient
  ) {
    super(config, httpClient);
  }

  list(theatreId: number, options?: RequestOptions): Observable<Location[]> {
    this.loading.next(true);
    return this.httpClient
      .get<Attempt<Location[]>>(
        `${this.config.apiUrl}/theatres/${theatreId}/locations`,
        options?.getRequestOptions()
      )
      .pipe(
        map((response: Attempt<Location[]>) => {
          if (response.failure) return response.result;
          this.items.next(response.result);
          return response.result;
        }),
        finalize(() => this.loading.next(false))
      );
  }
}
