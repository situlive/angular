import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { finalize, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { HttpServiceConfig, HTTP_SERVICE_CONFIG } from '../configs';
import { Brand, Attempt, BrandUser, SearchResultBrand } from '../models';
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
        if (response.failure) return response.result;
        this.items.next(response.result);
        return response.result;
      }),
      finalize(() => this.loading.next(false))
    );
  }

  search(searchTerm: string): Observable<SearchResultBrand> {
    return this.httpClient
      .post<Attempt<SearchResultBrand>>(
        `${this.config.apiUrl}/${this.endpoint}/search`,
        { searchTerm }
      )
      .pipe(
        map((response: Attempt<SearchResultBrand>) => {
          // TODO: Handle the response (i.e. handle any errors)
          return response.result;
        })
      );
  }

  simple(onlyConfirmed: boolean = false): Observable<Brand[]> {
    return this.httpClient
      .get<Attempt<Brand[]>>(
        `${this.config.apiUrl}/${this.endpoint}/simple?onlyConfirmed=${onlyConfirmed}`
      )
      .pipe(
        map((response: Attempt<Brand[]>) => {
          // TODO: Handle the response (i.e. handle any errors)
          return response.result;
        })
      );
  }

  getBySlug(slug: string): Observable<Brand> {
    return this.httpClient
      .get<Attempt<Brand>>(`${this.config.apiUrl}/${this.endpoint}/${slug}`)
      .pipe(
        map((response: Attempt<Brand>) => {
          return response.result;
        })
      );
  }
}
