import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { finalize, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { HttpServiceConfig, HTTP_SERVICE_CONFIG } from '../configs';
import {
  Brand,
  Attempt,
  SearchResultItems,
  RequestOptions,
  InviteUser,
  Search,
} from '../models';
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

  inviteUsers(
    model: InviteUser,
    options?: RequestOptions
  ): Observable<boolean> {
    return this.httpClient
      .post<Attempt<boolean>>(
        `${this.config.apiUrl}/${this.endpoint}/invite`,
        model,
        options?.getRequestOptions()
      )
      .pipe(
        map((response: Attempt<boolean>) => {
          return response.result;
        })
      );
  }

  search(
    search: Search,
    options?: RequestOptions
  ): Observable<SearchResultItems> {
    return this.httpClient
      .post<Attempt<SearchResultItems>>(
        `${this.config.apiUrl}/${this.endpoint}/search`,
        search,
        options?.getRequestOptions()
      )
      .pipe(
        map((response: Attempt<SearchResultItems>) => {
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
