import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { finalize, map } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';

import { HttpServiceConfig, HTTP_SERVICE_CONFIG } from '../configs';
import { Brand, Attempt, SearchResultBrand, RequestOptions } from '../models';
import { BaseService } from './base.service';

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

  list(options?: RequestOptions): Observable<Brand[]> {
    this.loading.next(true);

    let url = `${this.config.apiUrl}/brands`;
    if (options?.skip || options?.take)
      url += `?skip=${options.skip}&take=${options.take}`;

    return this.httpClient
      .get<Attempt<Brand[]>>(url, options?.getRequestOptions())
      .pipe(
        map((response: Attempt<Brand[]>) => {
          if (response.failure) return response.result;
          this.items.next(response.result);
          return response.result;
        }),
        finalize(() => this.loading.next(false))
      );
  }

  listSubscriptions(
    brandId: number,
    options?: RequestOptions
  ): Observable<Subscription[]> {
    this.loading.next(true);

    return this.httpClient
      .get<Attempt<Subscription[]>>(
        `${this.config.apiUrl}/${this.endpoint}/${brandId}/subscriptions`,
        options?.getRequestOptions()
      )
      .pipe(
        map((response: Attempt<Subscription[]>) => {
          if (response.failure) return response.result;
          return response.result;
        })
      );
  }

  search(
    searchTerm: string,
    options?: RequestOptions
  ): Observable<SearchResultBrand> {
    return this.httpClient
      .post<Attempt<SearchResultBrand>>(
        `${this.config.apiUrl}/${this.endpoint}/search`,
        { searchTerm },
        options?.getRequestOptions()
      )
      .pipe(
        map((response: Attempt<SearchResultBrand>) => {
          // TODO: Handle the response (i.e. handle any errors)
          return response.result;
        })
      );
  }

  simple(
    onlyConfirmed: boolean = false,
    options?: RequestOptions
  ): Observable<Brand[]> {
    return this.httpClient
      .get<Attempt<Brand[]>>(
        `${this.config.apiUrl}/${this.endpoint}/simple?onlyConfirmed=${onlyConfirmed}`,
        options?.getRequestOptions()
      )
      .pipe(
        map((response: Attempt<Brand[]>) => {
          // TODO: Handle the response (i.e. handle any errors)
          return response.result;
        })
      );
  }

  getBySlug(slug: string, options?: RequestOptions): Observable<Brand> {
    return this.httpClient
      .get<Attempt<Brand>>(
        `${this.config.apiUrl}/${this.endpoint}/slug/${slug}`,
        options?.getRequestOptions()
      )
      .pipe(
        map((response: Attempt<Brand>) => {
          return response.result;
        })
      );
  }
}
