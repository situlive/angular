import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { finalize, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { HttpServiceConfig, HTTP_SERVICE_CONFIG } from '../configs';
import { Contact, Attempt, RequestOptions } from '../models';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class ContactService extends BaseService<Contact> {
  constructor(
    @Inject(HTTP_SERVICE_CONFIG) public config: HttpServiceConfig,
    public httpClient: HttpClient
  ) {
    super(config, 'contacts', httpClient);
  }

  list(id: number, options?: RequestOptions): Observable<Contact[]> {
    this.loading.next(true);

    return this.httpClient
      .get<Attempt<Contact[]>>(
        `${this.config.apiUrl}/brands/${id}/contacts`,
        options?.getRequestOptions()
      )
      .pipe(
        map((response: Attempt<Contact[]>) => {
          if (response.failure) return response.result;
          this.items.next(response.result);
          return response.result;
        }),
        finalize(() => this.loading.next(false))
      );
  }
}
