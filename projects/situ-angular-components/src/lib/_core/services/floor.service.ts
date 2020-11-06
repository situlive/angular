import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { finalize, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { HttpServiceConfig, HTTP_SERVICE_CONFIG } from '../configs';
import { Floor, Attempt } from '../models';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class FloorService extends BaseService<Floor> {
  constructor(
    @Inject(HTTP_SERVICE_CONFIG) public config: HttpServiceConfig,
    httpClient: HttpClient
  ) {
    super(config, 'floors', httpClient);
  }

  list(venueId: number): Observable<Floor[]> {
    this.loading.next(true);
    return this.httpClient
      .get<Attempt<Floor[]>>(`${this.config.apiUrl}/venues/${venueId}/floors`)
      .pipe(
        map((response: Attempt<Floor[]>) => {
          this.items.next(response.result);
          return response.result;
        }),
        finalize(() => this.loading.next(false))
      );
  }
}
