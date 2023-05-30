import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { HttpServiceConfig, HTTP_SERVICE_CONFIG } from '../configs';
import {
  Attempt,
  LocationAssignment,
  Location,
  RequestOptions,
} from '../models';
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

  listLocationAssignments(
    id: number,
    options?: RequestOptions
  ): Observable<LocationAssignment[]> {
    return this.httpClient
      .get<Attempt<LocationAssignment[]>>(
        `${this.config.apiUrl}/locations/${id}/location-assignments`,
        options?.getRequestOptions()
      )
      .pipe(
        map((response: Attempt<LocationAssignment[]>) => {
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
