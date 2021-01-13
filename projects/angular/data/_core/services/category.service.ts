import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { finalize, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { HttpServiceConfig, HTTP_SERVICE_CONFIG } from '../configs';
import { Category, Attempt } from '../models';
import { BaseService } from './base.service';
@Injectable({
  providedIn: 'root',
})
export class CategoryService extends BaseService<Category> {
  constructor(
    @Inject(HTTP_SERVICE_CONFIG) public config: HttpServiceConfig,
    public httpClient: HttpClient
  ) {
    super(config, 'categories', httpClient);
  }

  list(): Observable<Category[]> {
    this.loading.next(true);
    return this.httpClient
      .get<Attempt<Category[]>>(`${this.config.apiUrl}/categories`)
      .pipe(
        map((response: Attempt<Category[]>) => {
          if (response.failure) return response.result;
          this.items.next(response.result);
          return response.result;
        }),
        finalize(() => this.loading.next(false))
      );
  }
}
