import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { HttpServiceConfig, HTTP_SERVICE_CONFIG } from '../configs';
import { Address, Attempt, RequestOptions } from '../models';

@Injectable({
  providedIn: 'root',
})
export class BrandAddressService {
  public items: BehaviorSubject<Address[]>;
  public loading: BehaviorSubject<boolean>;

  constructor(
    @Inject(HTTP_SERVICE_CONFIG) private config: HttpServiceConfig,
    public httpClient: HttpClient
  ) {
    this.items = new BehaviorSubject<Address[]>([]);
    this.loading = new BehaviorSubject<boolean>(false);
  }

  list(brandId: number, options?: RequestOptions): Observable<Address[]> {
    this.loading.next(true);

    return this.httpClient
      .get<Attempt<Address[]>>(
        `${this.config.apiUrl}/brands/${brandId}/addresses`,
        options?.getRequestOptions()
      )
      .pipe(
        map((response: Attempt<Address[]>) => {
          if (response.failure) return response.result;
          this.items.next(response.result);
          return response.result;
        }),
        finalize(() => this.loading.next(false))
      );
  }

  get(
    brandId: number,
    id: number,
    options?: RequestOptions
  ): Observable<Address> {
    return this.httpClient
      .get<Attempt<Address>>(
        `${this.config.apiUrl}/brands/${brandId}/addresses/${id}`,
        options?.getRequestOptions()
      )
      .pipe(
        map((response: Attempt<Address>) => {
          return response.result;
        })
      );
  }

  create(model: Address, options?: RequestOptions): Observable<Address> {
    return this.httpClient
      .post<Attempt<Address>>(
        `${this.config.apiUrl}/brands/${model.brandId}/addresses`,
        model,
        options?.getRequestOptions()
      )
      .pipe(
        map((response: Attempt<Address>) => {
          if (response.failure) return response.result;
          const items = this.items.value;
          items.push(response.result);
          this.items.next(items);
          return response.result;
        })
      );
  }

  update(model: Address, options?: RequestOptions): Observable<Address> {
    return this.httpClient
      .put<Attempt<Address>>(
        `${this.config.apiUrl}/brands/${model.brandId}/addresses`,
        model,
        options?.getRequestOptions()
      )
      .pipe(
        map((response: Attempt<Address>) => {
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

  private remove(items: Address[], id: number) {
    items.forEach((item, i) => {
      if (item.id !== id) {
        return;
      }
      items.splice(i, 1);
    });
  }
}
