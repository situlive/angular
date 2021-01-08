import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { HttpServiceConfig, HTTP_SERVICE_CONFIG } from '../configs';
import { Attempt, Product } from '../models';

@Injectable({
  providedIn: 'root',
})
export class CategoryProductService {
  public items: BehaviorSubject<Product[]>;
  public loading: BehaviorSubject<boolean>;

  constructor(
    @Inject(HTTP_SERVICE_CONFIG) private config: HttpServiceConfig,
    public httpClient: HttpClient
  ) {
    this.items = new BehaviorSubject<Product[]>([]);
    this.loading = new BehaviorSubject<boolean>(false);
  }

  list(categoryId: string): Observable<Product[]> {
    this.loading.next(true);

    return this.httpClient
      .get<Attempt<Product[]>>(
        `${this.config.apiUrl}/categories/${categoryId}/products`
      )
      .pipe(
        map((response: Attempt<Product[]>) => {
          if (response.failure) return response.result;
          let products = response.result;
          this.items.next(products);
          return products;
        }),
        finalize(() => this.loading.next(false))
      );
  }

  create(categoryId: string, item: Product): Observable<Product> {
    return this.httpClient
      .post<Attempt<Product>>(
        `${this.config.apiUrl}/categories/${categoryId}/products`,
        {
          categoryId,
          productId: item.id,
        }
      )
      .pipe(
        map((response: Attempt<Product>) => {
          if (response.failure) return response.result;
          const items = this.items.value;
          items.push(item);
          this.items.next(items);
          return response.result;
        })
      );
  }

  delete(categoryId: string, id: string): Observable<boolean> {
    return this.httpClient
      .delete<Attempt<boolean>>(
        `${this.config.apiUrl}/categories/${categoryId}/products/${id}`
      )
      .pipe(
        map((response: Attempt<boolean>) => {
          if (response.failure) return response.result;
          const items = this.items.value;
          this.remove(items, id);
          return response.result;
        })
      );
  }

  private remove(items: Product[], id: string) {
    items.forEach((item, i) => {
      if (item.id !== id) {
        return;
      }
      items.splice(i, 1);
    });
  }
}
