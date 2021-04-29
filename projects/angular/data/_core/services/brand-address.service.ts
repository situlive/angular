import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { HttpServiceConfig, HTTP_SERVICE_CONFIG } from '../configs';
import { BrandAddress, Attempt, RequestOptions } from '../models';

@Injectable({
  providedIn: 'root',
})
export class BrandAddressService {
  public items: BehaviorSubject<BrandAddress[]>;
  public loading: BehaviorSubject<boolean>;

  constructor(
    @Inject(HTTP_SERVICE_CONFIG) private config: HttpServiceConfig,
    public httpClient: HttpClient
  ) {
    this.items = new BehaviorSubject<BrandAddress[]>([]);
    this.loading = new BehaviorSubject<boolean>(false);
  }

  list(brandId: number, options?: RequestOptions): Observable<BrandAddress[]> {
    this.loading.next(true);

    return this.httpClient
      .get<Attempt<BrandAddress[]>>(
        `${this.config.apiUrl}/brands/${brandId}/addresses`,
        options?.getRequestOptions()
      )
      .pipe(
        map((response: Attempt<BrandAddress[]>) => {
          if (response.failure) return response.result;
          this.items.next(response.result);
          return response.result;
        }),
        finalize(() => this.loading.next(false))
      );
  }

  create(
    model: BrandAddress,
    options?: RequestOptions
  ): Observable<BrandAddress> {
    return this.httpClient
      .post<Attempt<BrandAddress>>(
        `${this.config.apiUrl}/brands/${model.brandId}/addresses`,
        model,
        options?.getRequestOptions()
      )
      .pipe(
        map((response: Attempt<BrandAddress>) => {
          if (response.failure) return response.result;
          const items = this.items.value;
          items.push(response.result);
          this.items.next(items);
          return response.result;
        })
      );
  }

  update(
    model: BrandAddress,
    options?: RequestOptions
  ): Observable<BrandAddress> {
    return this.httpClient
      .put<Attempt<BrandAddress>>(
        `${this.config.apiUrl}/brands/${model.brandId}/addresses`,
        model,
        options?.getRequestOptions()
      )
      .pipe(
        map((response: Attempt<BrandAddress>) => {
          if (response.failure) return response.result;
          const newItem = response.result;
          const items = this.items.value;
          this.remove(items, newItem.id);
          items.push(newItem);
          this.items.next(items);
          return response.result;
        })
      );
  }

  delete(
    brandId: number,
    id: number,
    options?: RequestOptions
  ): Observable<boolean> {
    return this.httpClient
      .delete<Attempt<boolean>>(
        `${this.config.apiUrl}/brands/${brandId}/addresses/${id}`,
        options?.getRequestOptions()
      )
      .pipe(
        map((response: Attempt<boolean>) => {
          if (response.failure) return response.result;
          const items = this.items.value;
          this.remove(items, id);
          this.items.next(items);
          return response.result;
        })
      );
  }

  private remove(items: BrandAddress[], id: number) {
    items.forEach((item, i) => {
      if (item.id !== id) {
        return;
      }
      items.splice(i, 1);
    });
  }
}
