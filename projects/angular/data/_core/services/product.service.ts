import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { finalize, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { Product, Attempt, RequestOptions } from '../models';
import { BaseService } from './base.service';
import { HttpServiceConfig, HTTP_SERVICE_CONFIG } from '../configs';

@Injectable({
  providedIn: 'root',
})
export class ProductService extends BaseService<Product> {
  constructor(
    @Inject(HTTP_SERVICE_CONFIG) public config: HttpServiceConfig,
    httpClient: HttpClient
  ) {
    super(config, 'products', httpClient);
  }

  list(categoryId: number, options?: RequestOptions): Observable<Product[]> {
    this.loading.next(true);
    return this.httpClient
      .get<Attempt<Product[]>>(
        `${this.config.apiUrl}/categories/${categoryId}/products/master`,
        options?.getRequestOptions()
      )
      .pipe(
        map((response: Attempt<Product[]>) => {
          if (response.failure) return response.result;
          this.items.next(response.result);
          return response.result;
        }),
        finalize(() => this.loading.next(false))
      );
  }

  get(id: number, options?: RequestOptions): Observable<Product> {
    return this.httpClient
      .get<Attempt<Product>>(
        `${this.config.apiUrl}/products/${id}`,
        options?.getRequestOptions()
      )
      .pipe(
        map((response: Attempt<Product>) => {
          return response.result;
        })
      );
  }

  public updateSpecification(
    item: Product,
    options?: RequestOptions
  ): Observable<Product> {
    return this.httpClient
      .put<Attempt<Product>>(
        `${this.config.apiUrl}/${this.endpoint}/specification`,
        item,
        options?.getRequestOptions()
      )
      .pipe(
        map((response: Attempt<Product>) => {
          if (response.failure) return response.result;
          const newItem = response.result;
          const items = this.items.value;
          this.removeProduct(items, newItem.id);
          items.push(newItem);
          this.items.next(items);
          return response.result;
        })
      );
  }

  public approve(item: Product, options?: RequestOptions): Observable<Product> {
    return this.httpClient
      .put<Attempt<Product>>(
        `${this.config.apiUrl}/${this.endpoint}/approve`,
        item,
        options?.getRequestOptions()
      )
      .pipe(
        map((response: Attempt<Product>) => {
          if (response.failure) return response.result;
          const newItem = response.result;
          const items = this.items.value;
          this.removeProduct(items, newItem.id);
          items.push(newItem);
          this.items.next(items);
          return response.result;
        })
      );
  }

  public reject(item: Product, options?: RequestOptions): Observable<Product> {
    return this.httpClient
      .put<Attempt<Product>>(
        `${this.config.apiUrl}/${this.endpoint}/reject`,
        item,
        options?.getRequestOptions()
      )
      .pipe(
        map((response: Attempt<Product>) => {
          if (response.failure) return response.result;
          const newItem = response.result;
          const items = this.items.value;
          this.removeProduct(items, newItem.id);
          items.push(newItem);
          this.items.next(items);
          return response.result;
        })
      );
  }

  private removeProduct(items: Product[], id: number | string) {
    items.forEach((item, i) => {
      if (item.id !== id) {
        return;
      }
      items.splice(i, 1);
    });
  }
}
