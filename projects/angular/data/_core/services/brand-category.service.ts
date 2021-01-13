import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { HttpServiceConfig, HTTP_SERVICE_CONFIG } from '../configs';
import { Attempt, Category } from '../models';

@Injectable({
  providedIn: 'root',
})
export class BrandCategoryService {
  public items: BehaviorSubject<Category[]>;
  public loading: BehaviorSubject<boolean>;

  constructor(
    @Inject(HTTP_SERVICE_CONFIG) private config: HttpServiceConfig,
    public httpClient: HttpClient
  ) {
    this.items = new BehaviorSubject<Category[]>([]);
    this.loading = new BehaviorSubject<boolean>(false);
  }

  list(brandId: number): Observable<Category[]> {
    this.loading.next(true);

    return this.httpClient
      .get<Attempt<Category[]>>(
        `${this.config.apiUrl}/brands/${brandId}/categories`
      )
      .pipe(
        map((response: Attempt<Category[]>) => {
          if (response.failure) return response.result;
          let categories = response.result;
          this.items.next(categories);
          return categories;
        }),
        finalize(() => this.loading.next(false))
      );
  }

  create(brandId: number, item: Category): Observable<Category> {
    return this.httpClient
      .post<Attempt<Category>>(
        `${this.config.apiUrl}/brands/${brandId}/categories`,
        {
          brandId,
          categoryId: item.id,
        }
      )
      .pipe(
        map((response: Attempt<Category>) => {
          if (response.failure) return response.result;
          const items = this.items.value;
          items.push(item);
          this.items.next(items);
          return response.result;
        })
      );
  }

  delete(brandId: number, id: string): Observable<boolean> {
    return this.httpClient
      .delete<Attempt<boolean>>(
        `${this.config.apiUrl}/brands/${brandId}/categories/${id}`
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

  private remove(items: Category[], id: string) {
    items.forEach((item, i) => {
      if (item.id !== id) {
        return;
      }
      items.splice(i, 1);
    });
  }
}
