import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { finalize, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { HttpServiceConfig, HTTP_SERVICE_CONFIG } from '../configs';
import { Group, Attempt } from '../models';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class GroupService extends BaseService<Group> {
  constructor(
    @Inject(HTTP_SERVICE_CONFIG) public config: HttpServiceConfig,
    httpClient: HttpClient
  ) {
    super(config, 'groups', httpClient);
  }

  list(): Observable<Group[]> {
    this.loading.next(true);
    return this.httpClient
      .get<Attempt<Group[]>>(`${this.config.apiUrl}/groups`)
      .pipe(
        map((response: Attempt<Group[]>) => {
          if (response.failure) return response.result;
          this.items.next(response.result);
          return response.result;
        }),
        finalize(() => this.loading.next(false))
      );
  }
}
