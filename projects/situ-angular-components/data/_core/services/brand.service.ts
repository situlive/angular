import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { finalize, map } from 'rxjs/operators';
import { forkJoin, Observable } from 'rxjs';

import { HttpServiceConfig, HTTP_SERVICE_CONFIG } from '../configs';
import { Brand, Attempt, BrandUser } from '../models';
import { BaseService } from './base.service';
import { ListOptions } from '../models/list-options';

@Injectable({
  providedIn: 'root',
})
export class BrandService extends BaseService<Brand> {
  constructor(
    @Inject(HTTP_SERVICE_CONFIG) public config: HttpServiceConfig,
    public httpClient: HttpClient
  ) {
    super(config, 'brands', httpClient);
  }

  list(options?: ListOptions): Observable<Brand[]> {
    this.loading.next(true);

    let url = `${this.config.apiUrl}/brands`;
    if (options) url += `?skip=${options.skip}&take=${options.take}`;

    return this.httpClient.get<Attempt<Brand[]>>(url).pipe(
      map((response: Attempt<Brand[]>) => {
        this.items.next(response.result);
        return response.result;
      }),
      finalize(() => this.loading.next(false))
    );
  }

  simple(): Observable<Brand[]> {
    return this.httpClient
      .get<Attempt<Brand[]>>(`${this.config.apiUrl}/${this.endpoint}/simple`)
      .pipe(
        map((response: Attempt<Brand[]>) => {
          // TODO: Handle the response (i.e. handle any errors)
          return response.result;
        })
      );
  }

  addUser(brandId: number, brandUser: BrandUser): Observable<any> {
    var updateUser = this.httpClient.put<Attempt<any>>(
      `${this.config.identityServerUrl}/users`,
      brandUser
    );
    var createBrandUser = this.httpClient.post<Attempt<boolean>>(
      `${this.config.apiUrl}/${this.endpoint}/${brandId}/users`,
      brandUser
    );

    var attempts = [];
    attempts.push(updateUser);
    attempts.push(createBrandUser);

    return forkJoin(attempts);
  }
}
