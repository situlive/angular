import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { finalize, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { HttpServiceConfig, HTTP_SERVICE_CONFIG } from '../configs';
import { Claim, Attempt, RequestOptions } from '../models';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class ClaimService extends BaseService<Claim> {
  constructor(
    @Inject(HTTP_SERVICE_CONFIG) public config: HttpServiceConfig,
    public httpClient: HttpClient
  ) {
    super(config, 'claims', httpClient, false);
  }

  list(options?: RequestOptions): Observable<Claim[]> {
    this.loading.next(true);
    return this.httpClient
      .get<Attempt<Claim[]>>(
        `${this.config.identityServerUrl}/claims`,
        options?.getRequestOptions()
      )
      .pipe(
        map((response: Attempt<Claim[]>) => {
          if (response.failure) return response.result;
          this.items.next(response.result);
          return response.result;
        }),
        finalize(() => this.loading.next(false))
      );
  }
}
