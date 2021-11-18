import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { HttpServiceConfig, HTTP_SERVICE_CONFIG } from '../configs';
import { Attempt, DemoUnitLocation, RequestOptions } from '../models';

@Injectable({
  providedIn: 'root',
})
export class DemoUnitLocationLocationService {
  constructor(
    @Inject(HTTP_SERVICE_CONFIG) private config: HttpServiceConfig,
    public httpClient: HttpClient
  ) {}

  create(
    item: DemoUnitLocation,
    options?: RequestOptions
  ): Observable<DemoUnitLocation> {
    return this.httpClient
      .post<Attempt<DemoUnitLocation>>(
        `${this.config.apiUrl}/demoUnits/${item.id}/locations`,
        item,
        options?.getRequestOptions()
      )
      .pipe(
        map((response: Attempt<DemoUnitLocation>) => {
          if (response.failure) return response.result;
          return response.result;
        })
      );
  }

  update(
    item: DemoUnitLocation,
    options?: RequestOptions
  ): Observable<DemoUnitLocation> {
    return this.httpClient
      .put<Attempt<DemoUnitLocation>>(
        `${this.config.apiUrl}/demoUnits/${item.id}/locations`,
        item,
        options?.getRequestOptions()
      )
      .pipe(
        map((response: Attempt<DemoUnitLocation>) => {
          if (response.failure) return response.result;
          return response.result;
        })
      );
  }

  delete(
    locationId: number,
    id: number,
    options?: RequestOptions
  ): Observable<boolean> {
    return this.httpClient
      .delete<Attempt<boolean>>(
        `${this.config.apiUrl}/demoUnits/${id}/locations/${locationId}`,
        options?.getRequestOptions()
      )
      .pipe(
        map((response: Attempt<boolean>) => {
          if (response.failure) return response.result;
          return response.result;
        })
      );
  }
}
