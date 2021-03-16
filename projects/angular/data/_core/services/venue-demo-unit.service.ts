import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { finalize, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { HttpServiceConfig, HTTP_SERVICE_CONFIG } from '../configs';
import { DemoUnit, Attempt, RequestOptions } from '../models';
import { DemoUnitService } from './demo-unit.service';

@Injectable({
  providedIn: 'root',
})
export class VenueDemoUnitService extends DemoUnitService {
  constructor(
    @Inject(HTTP_SERVICE_CONFIG) public config: HttpServiceConfig,
    public httpClient: HttpClient
  ) {
    super(config, httpClient);
  }

  list(venueId: number, options?: RequestOptions): Observable<DemoUnit[]> {
    this.loading.next(true);
    return this.httpClient
      .get<Attempt<DemoUnit[]>>(
        `${this.config.apiUrl}/venues/${venueId}/demoUnits`,
        options?.getRequestOptions()
      )
      .pipe(
        map((response: Attempt<DemoUnit[]>) => {
          if (response.failure) return response.result;
          this.items.next(response.result);
          return response.result;
        }),
        finalize(() => this.loading.next(false))
      );
  }
}
