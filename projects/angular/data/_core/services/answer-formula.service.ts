import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { finalize, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { HttpServiceConfig, HTTP_SERVICE_CONFIG } from '../configs';
import { Formula, Attempt, RequestOptions } from '../models';
import { FormulaService } from './formula.service';

@Injectable({
  providedIn: 'root',
})
export class AnswerFormulaService extends FormulaService {
  constructor(
    @Inject(HTTP_SERVICE_CONFIG) public config: HttpServiceConfig,
    public httpClient: HttpClient
  ) {
    super(config, httpClient);
  }

  listAnswerFormulas(
    answerId: number,
    options?: RequestOptions
  ): Observable<Formula[]> {
    this.loading.next(true);

    let url = `${this.config.apiUrl}/recommendation-answers/${answerId}/formulas`;
    if (options?.skip || options?.take)
      url += `?skip=${options.skip}&take=${options.take}`;

    return this.httpClient
      .get<Attempt<Formula[]>>(url, options?.getRequestOptions())
      .pipe(
        map((response: Attempt<Formula[]>) => {
          if (response.failure) return response.result;
          var items = response.result;
          this.items.next(items);
          return response.result;
        }),
        finalize(() => this.loading.next(false))
      );
  }
}
