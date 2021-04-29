import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { HttpServiceConfig, HTTP_SERVICE_CONFIG } from '../configs';
import { DemoUnitAddress, Attempt, RequestOptions } from '../models';

@Injectable({
  providedIn: 'root',
})
export class DemoUnitAddressService {
  public items: BehaviorSubject<DemoUnitAddress[]>;
  public loading: BehaviorSubject<boolean>;

  constructor(
    @Inject(HTTP_SERVICE_CONFIG) private config: HttpServiceConfig,
    public httpClient: HttpClient
  ) {
    this.items = new BehaviorSubject<DemoUnitAddress[]>([]);
    this.loading = new BehaviorSubject<boolean>(false);
  }

  list(
    demoUnitId: number,
    options?: RequestOptions
  ): Observable<DemoUnitAddress[]> {
    this.loading.next(true);

    return this.httpClient
      .get<Attempt<DemoUnitAddress[]>>(
        `${this.config.apiUrl}/demoUnits/${demoUnitId}/addresses`,
        options?.getRequestOptions()
      )
      .pipe(
        map((response: Attempt<DemoUnitAddress[]>) => {
          if (response.failure) return response.result;
          this.items.next(response.result);
          return response.result;
        }),
        finalize(() => this.loading.next(false))
      );
  }

  create(
    model: DemoUnitAddress,
    options?: RequestOptions
  ): Observable<DemoUnitAddress> {
    return this.httpClient
      .post<Attempt<DemoUnitAddress>>(
        `${this.config.apiUrl}/demoUnits/${model.demoUnitId}/addresses`,
        model,
        options?.getRequestOptions()
      )
      .pipe(
        map((response: Attempt<DemoUnitAddress>) => {
          if (response.failure) return response.result;
          const items = this.items.value;
          items.push(response.result);
          this.items.next(items);
          return response.result;
        })
      );
  }

  update(
    model: DemoUnitAddress,
    options?: RequestOptions
  ): Observable<DemoUnitAddress> {
    return this.httpClient
      .put<Attempt<DemoUnitAddress>>(
        `${this.config.apiUrl}/demoUnits/${model.demoUnitId}/addresses`,
        model,
        options?.getRequestOptions()
      )
      .pipe(
        map((response: Attempt<DemoUnitAddress>) => {
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
    demoUnitId: number,
    id: number,
    options?: RequestOptions
  ): Observable<boolean> {
    return this.httpClient
      .delete<Attempt<boolean>>(
        `${this.config.apiUrl}/demoUnits/${demoUnitId}/addresses/${id}`,
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

  private remove(items: DemoUnitAddress[], id: number) {
    items.forEach((item, i) => {
      if (item.id !== id) {
        return;
      }
      items.splice(i, 1);
    });
  }
}
