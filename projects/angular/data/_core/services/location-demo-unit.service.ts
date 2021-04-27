import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { HttpServiceConfig, HTTP_SERVICE_CONFIG } from '../configs';
import { Attempt, DemoUnit, RequestOptions } from '../models';

@Injectable({
  providedIn: 'root',
})
export class LocationDemoUnitService {
  public items: BehaviorSubject<DemoUnit[]>;
  public loading: BehaviorSubject<boolean>;

  constructor(
    @Inject(HTTP_SERVICE_CONFIG) private config: HttpServiceConfig,
    public httpClient: HttpClient
  ) {
    this.items = new BehaviorSubject<DemoUnit[]>([]);
    this.loading = new BehaviorSubject<boolean>(false);
  }

  list(locationId: number, options?: RequestOptions): Observable<DemoUnit[]> {
    this.loading.next(true);

    return this.httpClient
      .get<Attempt<DemoUnit[]>>(
        `${this.config.apiUrl}/locations/${locationId}/demoUnits`,
        options?.getRequestOptions()
      )
      .pipe(
        map((response: Attempt<DemoUnit[]>) => {
          if (response.failure) return response.result;
          let demoUnits = response.result;
          this.items.next(demoUnits);
          return demoUnits;
        }),
        finalize(() => this.loading.next(false))
      );
  }

  create(
    locationId: number,
    item: DemoUnit,
    options?: RequestOptions
  ): Observable<DemoUnit> {
    return this.httpClient
      .post<Attempt<DemoUnit>>(
        `${this.config.apiUrl}/locations/${locationId}/demoUnits`,
        {
          locationId,
          demoUnitId: item.id,
        },
        options?.getRequestOptions()
      )
      .pipe(
        map((response: Attempt<DemoUnit>) => {
          if (response.failure) return response.result;
          const items = this.items.value;
          items.push(item);
          this.items.next(items);
          return response.result;
        })
      );
  }

  delete(
    locationId: number,
    id: number,
    options?: RequestOptions
  ): Observable<boolean> {
    return this.httpClient
      .delete<Attempt<boolean>>(
        `${this.config.apiUrl}/locations/${locationId}/demoUnits/${id}`,
        options?.getRequestOptions()
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

  private remove(items: DemoUnit[], id: number) {
    items.forEach((item, i) => {
      if (item.id !== id) {
        return;
      }
      items.splice(i, 1);
    });
  }
}
