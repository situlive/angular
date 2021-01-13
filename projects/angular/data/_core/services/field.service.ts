import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { finalize, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { HttpServiceConfig, HTTP_SERVICE_CONFIG } from '../configs';
import { Attempt, Field } from '../models';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class FieldService extends BaseService<Field> {
  constructor(
    @Inject(HTTP_SERVICE_CONFIG) public config: HttpServiceConfig,
    public httpClient: HttpClient
  ) {
    super(config, 'fields', httpClient);
  }

  list(categoryId: string, onlySpecification: boolean): Observable<Field[]> {
    this.loading.next(true);
    return this.httpClient
      .get<Attempt<Field[]>>(
        `${this.config.apiUrl}/categories/${categoryId}/fields?onlySpecification=${onlySpecification}`
      )
      .pipe(
        map((response: Attempt<Field[]>) => {
          if (response.failure) return response.result;
          this.items.next(response.result);
          return response.result;
        }),
        finalize(() => this.loading.next(false))
      );
  }
}
