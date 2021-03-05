import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { finalize, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { Feed, Attempt, RequestOptions, Product } from '../models';
import { BaseService } from './base.service';
import { HttpServiceConfig, HTTP_SERVICE_CONFIG } from '../configs';

@Injectable({
  providedIn: 'root',
})
export class FeedService extends BaseService<Feed> {
  constructor(
    @Inject(HTTP_SERVICE_CONFIG) public config: HttpServiceConfig,
    httpClient: HttpClient
  ) {
    super(config, 'feeds', httpClient);
  }

  list(categoryId: number, options?: RequestOptions): Observable<Feed[]> {
    this.loading.next(true);
    return this.httpClient
      .get<Attempt<Feed[]>>(
        `${this.config.apiUrl}/categories/${categoryId}/feeds`,
        options?.getRequestOptions()
      )
      .pipe(
        map((response: Attempt<Feed[]>) => {
          if (response.failure) return response.result;
          this.items.next(response.result);
          return response.result;
        }),
        finalize(() => this.loading.next(false))
      );
  }

  products(id: number, options?: RequestOptions): Observable<Product[]> {
    return this.httpClient
      .get<Attempt<Product[]>>(
        `${this.config.apiUrl}/feeds/${id}/products`,
        options?.getRequestOptions()
      )
      .pipe(
        map((response: Attempt<Product[]>) => {
          return response.result;
        })
      );
  }

  get(id: number, options?: RequestOptions): Observable<Feed> {
    return this.httpClient
      .get<Attempt<Feed>>(
        `${this.config.apiUrl}/feeds/${id}`,
        options?.getRequestOptions()
      )
      .pipe(
        map((response: Attempt<Feed>) => {
          return response.result;
        })
      );
  }

  structure(id: number, options?: RequestOptions): Observable<any> {
    return this.httpClient
      .get<Attempt<any>>(
        `${this.config.apiUrl}/feeds/${id}//products/structure`,
        options?.getRequestOptions()
      )
      .pipe(
        map((response: Attempt<any>) => {
          return response.result;
        })
      );
  }

  createFile(file: File, options?: RequestOptions): Observable<string> {
    const formData = new FormData();
    formData.append('file', file);
    return this.httpClient
      .post<Attempt<string>>(
        `${this.config.apiUrl}/feeds/files`,
        formData,
        options?.getRequestOptions()
      )
      .pipe(
        map((response: Attempt<string>) => {
          return response.result;
        })
      );
  }
}
