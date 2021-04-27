import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { HttpServiceConfig, HTTP_SERVICE_CONFIG } from '../configs';
import { PlanLine, Attempt, RequestOptions } from '../models';

@Injectable({
  providedIn: 'root',
})
export class PlanLineService {
  public items: BehaviorSubject<PlanLine[]>;
  public loading: BehaviorSubject<boolean>;

  constructor(
    @Inject(HTTP_SERVICE_CONFIG) private config: HttpServiceConfig,
    public httpClient: HttpClient
  ) {
    this.items = new BehaviorSubject<PlanLine[]>([]);
    this.loading = new BehaviorSubject<boolean>(false);
  }

  list(planId: number, options?: RequestOptions): Observable<PlanLine[]> {
    this.loading.next(true);

    return this.httpClient
      .get<Attempt<PlanLine[]>>(
        `${this.config.apiUrl}/subscriptions/${planId}/lines`,
        options?.getRequestOptions()
      )
      .pipe(
        map((response: Attempt<PlanLine[]>) => {
          if (response.failure) return response.result;
          this.items.next(response.result);
          return response.result;
        }),
        finalize(() => this.loading.next(false))
      );
  }

  create(model: PlanLine, options?: RequestOptions): Observable<PlanLine> {
    return this.httpClient
      .post<Attempt<PlanLine>>(
        `${this.config.apiUrl}/subscriptions/${model.planId}/lines`,
        model,
        options?.getRequestOptions()
      )
      .pipe(
        map((response: Attempt<PlanLine>) => {
          if (response.failure) return response.result;
          const items = this.items.value;
          items.push(response.result);
          this.items.next(items);
          return response.result;
        })
      );
  }

  update(model: PlanLine, options?: RequestOptions): Observable<PlanLine> {
    return this.httpClient
      .put<Attempt<PlanLine>>(
        `${this.config.apiUrl}/subscriptions/${model.planId}/lines`,
        model,
        options?.getRequestOptions()
      )
      .pipe(
        map((response: Attempt<PlanLine>) => {
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
    planId: number,
    id: number,
    options?: RequestOptions
  ): Observable<boolean> {
    return this.httpClient
      .delete<Attempt<boolean>>(
        `${this.config.apiUrl}/subscriptions/${planId}/lines/${id}`,
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

  private remove(items: PlanLine[], id: number) {
    items.forEach((item, i) => {
      if (item.id !== id) {
        return;
      }
      items.splice(i, 1);
    });
  }
}
