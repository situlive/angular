import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { HttpServiceConfig, HTTP_SERVICE_CONFIG } from '../configs';
import { Changeover, Attempt, RequestOptions } from '../models';

@Injectable({
  providedIn: 'root',
})
export class ChangeoverService {
  public items: BehaviorSubject<Changeover[]>;
  public loading: BehaviorSubject<boolean>;

  constructor(
    @Inject(HTTP_SERVICE_CONFIG) private config: HttpServiceConfig,
    public httpClient: HttpClient
  ) {
    this.items = new BehaviorSubject<Changeover[]>([]);
    this.loading = new BehaviorSubject<boolean>(false);
  }

  list(venueId: number, options?: RequestOptions): Observable<Changeover[]> {
    this.loading.next(true);

    return this.httpClient
      .get<Attempt<Changeover[]>>(
        `${this.config.apiUrl}/venues/${venueId}/changeovers`,
        options?.getRequestOptions()
      )
      .pipe(
        map((response: Attempt<Changeover[]>) => {
          if (response.failure) return response.result;
          this.items.next(response.result);
          return response.result;
        }),
        finalize(() => this.loading.next(false))
      );
  }

  create(model: Changeover, options?: RequestOptions): Observable<Changeover> {
    return this.httpClient
      .post<Attempt<Changeover>>(
        `${this.config.apiUrl}/venues/${model.venueId}/changeovers`,
        model,
        options?.getRequestOptions()
      )
      .pipe(
        map((response: Attempt<Changeover>) => {
          if (response.failure) return response.result;
          const items = this.items.value;
          items.push(response.result);
          this.items.next(items);
          return response.result;
        })
      );
  }

  update(model: Changeover, options?: RequestOptions): Observable<Changeover> {
    return this.httpClient
      .put<Attempt<Changeover>>(
        `${this.config.apiUrl}/venues/${model.venueId}/changeovers`,
        model,
        options?.getRequestOptions()
      )
      .pipe(
        map((response: Attempt<Changeover>) => {
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
    venueId: number,
    id: number,
    options?: RequestOptions
  ): Observable<boolean> {
    return this.httpClient
      .delete<Attempt<boolean>>(
        `${this.config.apiUrl}/venues/${venueId}/changeovers/${id}`,
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

  private remove(items: Changeover[], id: number) {
    items.forEach((item, i) => {
      if (item.id !== id) {
        return;
      }
      items.splice(i, 1);
    });
  }
}
