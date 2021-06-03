import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { HttpServiceConfig, HTTP_SERVICE_CONFIG } from '../configs';
import { Attempt, Location, RequestOptions } from '../models';

@Injectable({
  providedIn: 'root',
})
export class ZoneLocationService {
  public items: BehaviorSubject<Location[]>;
  public loading: BehaviorSubject<boolean>;

  constructor(
    @Inject(HTTP_SERVICE_CONFIG) private config: HttpServiceConfig,
    public httpClient: HttpClient
  ) {
    this.items = new BehaviorSubject<Location[]>([]);
    this.loading = new BehaviorSubject<boolean>(false);
  }

  list(locationId: number, options?: RequestOptions): Observable<Location[]> {
    this.loading.next(true);

    return this.httpClient
      .get<Attempt<Location[]>>(
        `${this.config.apiUrl}/locations/${locationId}/zones`,
        options?.getRequestOptions()
      )
      .pipe(
        map((response: Attempt<Location[]>) => {
          if (response.failure) return response.result;
          let zones = response.result;
          this.items.next(zones);
          return zones;
        }),
        finalize(() => this.loading.next(false))
      );
  }

  create(item: Location, options?: RequestOptions): Observable<boolean> {
    return this.httpClient
      .post<Attempt<boolean>>(
        `${this.config.apiUrl}/zones/${item.zoneId}/locations`,
        item,
        options?.getRequestOptions()
      )
      .pipe(
        map((response: Attempt<boolean>) => {
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
        `${this.config.apiUrl}/zones/${id}/locations/${locationId}`,
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

  private remove(items: Location[], id: number) {
    items.forEach((item, i) => {
      if (item.id !== id) {
        return;
      }
      items.splice(i, 1);
    });
  }
}
