import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { finalize, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { HttpServiceConfig, HTTP_SERVICE_CONFIG } from '../configs';
import { Role, Attempt, RequestOptions } from '../models';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class RoleService extends BaseService<Role> {
  constructor(
    @Inject(HTTP_SERVICE_CONFIG) public config: HttpServiceConfig,
    public httpClient: HttpClient
  ) {
    super(config, 'roles', httpClient, false);
  }

  list(options?: RequestOptions): Observable<Role[]> {
    this.loading.next(true);
    return this.httpClient
      .get<Attempt<Role[]>>(
        `${this.config.identityServerUrl}/roles`,
        options?.getRequestOptions()
      )
      .pipe(
        map((response: Attempt<Role[]>) => {
          if (response.failure) return response.result;
          this.items.next(response.result);
          return response.result;
        }),
        finalize(() => this.loading.next(false))
      );
  }
}
