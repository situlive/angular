import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { HttpServiceConfig, HTTP_SERVICE_CONFIG } from '../configs';
import { Attempt, Plan, TheatrePlan } from '../models';

@Injectable({
  providedIn: 'root',
})
export class TheatrePlanService {
  public items: BehaviorSubject<Plan[]>;
  public loading: BehaviorSubject<boolean>;

  constructor(
    @Inject(HTTP_SERVICE_CONFIG) private config: HttpServiceConfig,
    public httpClient: HttpClient
  ) {
    this.items = new BehaviorSubject<Plan[]>([]);
    this.loading = new BehaviorSubject<boolean>(false);
  }

  list(theatreId: number): Observable<Plan[]> {
    this.loading.next(true);
    return this.httpClient
      .get<Attempt<Plan[]>>(`${this.config.apiUrl}/theatres/${theatreId}/plans`)
      .pipe(
        map((response: Attempt<Plan[]>) => {
          if (response.failure) return response.result;
          let items = response.result.map((item: Plan) => {
            var theatre = item.theatres?.find(
              (m: TheatrePlan) => m.theatreId === +theatreId
            );
            item.quantity = theatre?.quantity ?? 0;
            item.booked = theatre?.booked ?? 0;
            item.available = item.quantity - item.booked;
            return item;
          });
          this.items.next(items);
          return items;
        }),
        finalize(() => this.loading.next(false))
      );
  }

  create(theatreId: number, item: Plan): Observable<boolean> {
    return this.httpClient
      .post<Attempt<boolean>>(
        `${this.config.apiUrl}/theatres/${theatreId}/plans`,
        {
          theatreId,
          planId: item.id,
          quantity: item.quantity,
        }
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

  update(theatreId: number, item: Plan): Observable<boolean> {
    return this.httpClient
      .put<Attempt<boolean>>(
        `${this.config.apiUrl}/theatres/${theatreId}/plans`,
        {
          theatreId,
          planId: item.id,
          quantity: item.quantity,
        }
      )
      .pipe(
        map((response: Attempt<boolean>) => {
          if (response.failure) return response.result;
          const items = this.items.value;
          this.remove(items, item.id);
          items.push(item);
          this.items.next(items);
          return response.result;
        })
      );
  }

  delete(theatreId: number, id: number): Observable<boolean> {
    return this.httpClient
      .delete<Attempt<boolean>>(
        `${this.config.apiUrl}/theatres/${theatreId}/plans/${id}`
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

  private remove(items: Plan[], id: number) {
    items.forEach((item, i) => {
      if (item.id !== id) {
        return;
      }
      items.splice(i, 1);
    });
  }
}
