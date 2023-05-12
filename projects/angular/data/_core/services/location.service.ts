import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { HttpServiceConfig, HTTP_SERVICE_CONFIG } from '../configs';
import { Attempt, DemoUnitLocation, Location, RequestOptions } from '../models';
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

  listDemoUnitLocations(
    id: number,
    options?: RequestOptions
  ): Observable<DemoUnitLocation[]> {
    return this.httpClient
      .get<Attempt<DemoUnitLocation[]>>(
        `${this.config.apiUrl}/locations/${id}/demoUnitLocations`,
        options?.getRequestOptions()
      )
      .pipe(
        map((response: Attempt<DemoUnitLocation[]>) => {
          if (response.failure) return response.result;
          return response.result;
        })
      );
  }

  public download(ids: number[]): Observable<any> {
    return this.httpClient.post(
      `${this.config.apiUrl}/${this.endpoint}/download`,
      { ids },
      { responseType: 'blob' }
    );
  }
}
