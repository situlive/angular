import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { finalize, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { HttpServiceConfig, HTTP_SERVICE_CONFIG } from '../configs';
import { LocationAssignment, Attempt, RequestOptions } from '../models';
import { LocationAssignmentService } from './location-assignment.service';

@Injectable({
  providedIn: 'root',
})
export class BrandLocationAssignmentService extends LocationAssignmentService {
  constructor(
    @Inject(HTTP_SERVICE_CONFIG) public config: HttpServiceConfig,
    public httpClient: HttpClient
  ) {
    super(config, httpClient);
  }

  list(
    brandId: number,
    startDate: string,
    endDate: string,
    options?: RequestOptions
  ): Observable<LocationAssignment[]> {
    this.loading.next(true);
    return this.httpClient
      .get<Attempt<LocationAssignment[]>>(
        `${this.config.apiUrl}/brands/${brandId}/location-assignments?startDate=${startDate}&endDate=${endDate}`,
        options?.getRequestOptions()
      )
      .pipe(
        map((response: Attempt<LocationAssignment[]>) => {
          if (response.failure) return response.result;
          this.items.next(response.result);
          return response.result;
        }),
        finalize(() => this.loading.next(false))
      );
  }
}
