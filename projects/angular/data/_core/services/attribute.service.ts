import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { HttpServiceConfig, HTTP_SERVICE_CONFIG } from '../configs';
import { BaseService } from './base.service';
import { Attempt, Attribute } from '../models';

@Injectable({
  providedIn: 'root',
})
export class AttributeService extends BaseService<Attribute> {
  constructor(
    @Inject(HTTP_SERVICE_CONFIG) public config: HttpServiceConfig,
    public httpClient: HttpClient
  ) {
    super(config, 'attributes', httpClient);
  }

  list(criterionId: number, includes: string = ''): Observable<Attribute[]> {
    return this.httpClient
      .get<Attempt<Attribute[]>>(
        `${this.config.apiUrl}/criteria/${criterionId}/attributes`,
        {
          params: { includes },
        }
      )
      .pipe(
        map((response: Attempt<Attribute[]>) => {
          if (response.failure) return response.result;
          this.items.next(response.result);
          return response.result;
        })
      );
  }
}
