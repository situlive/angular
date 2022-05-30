import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { HttpServiceConfig, HTTP_SERVICE_CONFIG } from '../configs';
import { Attempt, SocialLink, RequestOptions } from '../models';

@Injectable({
  providedIn: 'root',
})
export class BrandSocialLinkService {
  public items: BehaviorSubject<SocialLink[]>;
  public loading: BehaviorSubject<boolean>;

  constructor(
    @Inject(HTTP_SERVICE_CONFIG) private config: HttpServiceConfig,
    public httpClient: HttpClient
  ) {
    this.items = new BehaviorSubject<SocialLink[]>([]);
    this.loading = new BehaviorSubject<boolean>(false);
  }

  list(brandId: number, options?: RequestOptions): Observable<SocialLink[]> {
    this.loading.next(true);

    return this.httpClient
      .get<Attempt<SocialLink[]>>(
        `${this.config.apiUrl}/brands/${brandId}/social-links`,
        options?.getRequestOptions()
      )
      .pipe(
        map((response: Attempt<SocialLink[]>) => {
          if (response.failure) return response.result;
          let categories = response.result;
          this.items.next(categories);
          return categories;
        }),
        finalize(() => this.loading.next(false))
      );
  }

  create(item: SocialLink, options?: RequestOptions): Observable<SocialLink> {
    return this.httpClient
      .post<Attempt<SocialLink>>(
        `${this.config.apiUrl}/socialLinks`,
        item,
        options?.getRequestOptions()
      )
      .pipe(
        map((response: Attempt<SocialLink>) => {
          if (response.failure) return response.result;
          const items = this.items.value;
          items.push(item);
          this.items.next(items);
          return response.result;
        })
      );
  }

  delete(id: number, options?: RequestOptions): Observable<boolean> {
    return this.httpClient
      .delete<Attempt<boolean>>(
        `${this.config.apiUrl}/socialLinks/${id}`,
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

  private remove(items: SocialLink[], id: number) {
    items.forEach((item, i) => {
      if (item.id !== id) {
        return;
      }
      items.splice(i, 1);
    });
  }
}
