import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { finalize, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { HttpServiceConfig, HTTP_SERVICE_CONFIG } from '../configs';
import { Plan, Attempt, TheatrePlan } from '../models';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class PlanService extends BaseService<Plan> {
  constructor(
    @Inject(HTTP_SERVICE_CONFIG) public config: HttpServiceConfig,
    httpClient: HttpClient
  ) {
    super(config, 'plans', httpClient);
  }

  list(): Observable<Plan[]> {
    this.loading.next(true);
    return this.httpClient
      .get<Attempt<Plan[]>>(`${this.config.apiUrl}/plans`)
      .pipe(
        map((response: Attempt<Plan[]>) => {
          if (response.failure) return response.result;
          let items = response.result.map((item: Plan) => {
            let quantity = 0;
            let booked = 0;
            item.theatres?.forEach((m: TheatrePlan) => {
              quantity += m.quantity;
              booked += m.booked;
            });
            item.quantity = quantity;
            item.booked = booked;
            item.available = quantity - booked;
            return item;
          });

          this.items.next(items);
          return items;
        }),
        finalize(() => this.loading.next(false))
      );
  }

  registerInterest(id: number): Observable<void> {
    return this.httpClient
      .post<Attempt<void>>(
        `${this.config.apiUrl}/${this.endpoint}/${id}/interested`,
        {}
      )
      .pipe(
        map((response: Attempt<void>) => {
          // TODO: Handle the response (i.e. handle any errors)
          return response.result;
        })
      );
  }
}
