import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { finalize, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { HttpServiceConfig, HTTP_SERVICE_CONFIG } from '../configs';
import { DemoUnitLocation, Attempt, RequestOptions } from '../models';
import { DemoUnitLocationService } from './demo-unit-location.service';

@Injectable({
  providedIn: 'root',
})
export class BrandDemoUnitLocationService extends DemoUnitLocationService {
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
  ): Observable<DemoUnitLocation[]> {
    this.loading.next(true);
    return this.httpClient
      .get<Attempt<DemoUnitLocation[]>>(
        `${this.config.apiUrl}/brands/${brandId}/demoUnitLocations?startDate=${startDate}&endDate=${endDate}`,
        options?.getRequestOptions()
      )
      .pipe(
        map((response: Attempt<DemoUnitLocation[]>) => {
          if (response.failure) return response.result;
          this.items.next(response.result);
          return response.result;
        }),
        finalize(() => this.loading.next(false))
      );
  }
}
