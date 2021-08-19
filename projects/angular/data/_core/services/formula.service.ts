import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { finalize, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { HttpServiceConfig, HTTP_SERVICE_CONFIG } from '../configs';
import { BaseService } from './base.service';
import { Attempt, Formula, RequestOptions } from '../models';

@Injectable({
  providedIn: 'root',
})
export class FormulaService extends BaseService<Formula> {
  constructor(
    @Inject(HTTP_SERVICE_CONFIG) public config: HttpServiceConfig,
    public httpClient: HttpClient
  ) {
    super(config, 'formulas', httpClient);
  }

  list(attributeId: number, options?: RequestOptions): Observable<Formula[]> {
    this.loading.next(true);
    return this.httpClient
      .get<Attempt<Formula[]>>(
        `${this.config.apiUrl}/attributes/${attributeId}/formulas`,
        options?.getRequestOptions()
      )
      .pipe(
        map((response: Attempt<Formula[]>) => {
          if (response.failure) return response.result;
          this.items.next(response.result);
          return response.result;
        }),
        finalize(() => this.loading.next(false))
      );
  }
}
