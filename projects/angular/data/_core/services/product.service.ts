import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { finalize, map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';

import { Product, Attempt, RequestOptions } from '../models';
import { HttpServiceConfig, HTTP_SERVICE_CONFIG } from '../configs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private endpoint: string = 'products';

  public items: BehaviorSubject<Product[]>;
  public loading: BehaviorSubject<boolean>;

  constructor(
    @Inject(HTTP_SERVICE_CONFIG) public config: HttpServiceConfig,
    private httpClient: HttpClient
  ) {
    this.items = new BehaviorSubject<Product[]>([]);
    this.loading = new BehaviorSubject<boolean>(false);
  }

  list(categoryId: number, options?: RequestOptions): Observable<Product[]> {
    this.loading.next(true);
    return this.httpClient
      .get<Attempt<Product[]>>(
        `${this.config.apiUrl}/categories/${categoryId}/${this.endpoint}/master`,
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

  get(id: number, slug: string, options?: RequestOptions): Observable<Product> {
    return this.httpClient
      .get<Attempt<Product>>(
        `${this.config.apiUrl}/${this.endpoint}/${id}?slug=${slug}`,
        options?.getRequestOptions()
      )
      .pipe(
        map((response: Attempt<Product>) => {
          return response.result;
        })
      );
  }

  public create(item: Product, options?: RequestOptions): Observable<Product> {
    return this.httpClient
      .post<Attempt<Product>>(
        `${this.config.apiUrl}/${this.endpoint}`,
        item,
        options?.getRequestOptions()
      )
      .pipe(
        map((response: Attempt<Product>) => {
          if (response.failure) return response.result;
          const newItem = response.result;
          const items = this.items.value;
          items.push(newItem);
          this.items.next(items);
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
          this.remove(items, newItem.id);
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
          this.remove(items, newItem.id);
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
          this.remove(items, newItem.id);
          items.push(newItem);
          this.items.next(items);
          return response.result;
        })
      );
  }

  private remove(items: Product[], id: number | string) {
    items.forEach((item, i) => {
      if (item.id !== id) {
        return;
      }
      items.splice(i, 1);
    });
  }
}
