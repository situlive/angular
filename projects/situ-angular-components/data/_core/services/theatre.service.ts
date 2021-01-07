import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { finalize, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { HttpServiceConfig, HTTP_SERVICE_CONFIG } from '../configs';
import { Theatre, Attempt } from '../models';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class TheatreService extends BaseService<Theatre> {
  constructor(
    @Inject(HTTP_SERVICE_CONFIG) public config: HttpServiceConfig,
    httpClient: HttpClient
  ) {
    super(config, 'theatres', httpClient);
  }

  list(venueId: number): Observable<Theatre[]> {
    this.loading.next(true);
    return this.httpClient
      .get<Attempt<Theatre[]>>(
        `${this.config.apiUrl}/venues/${venueId}/theatres`
      )
      .pipe(
        map((response: Attempt<Theatre[]>) => {
          this.items.next(response.result);
          return response.result;
        }),
        finalize(() => this.loading.next(false))
      );
  }

  registerInterest(id: number): Observable<void> {
    return this.httpClient
      .post<Attempt<void>>(
        `${this.config.apiUrl}/${this.endpoint}/${id}/interested`,
        {}
      )
      .pipe(
        map((response: Attempt<void>) => {
          // TODO: Handle the response (i.e. handle any errors)
          return response.result;
        })
      );
  }
}
