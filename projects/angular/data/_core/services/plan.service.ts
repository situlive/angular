import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { finalize, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { HttpServiceConfig, HTTP_SERVICE_CONFIG } from '../configs';
import { Plan, Attempt, RequestOptions, Line } from '../models';
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

  list(options?: RequestOptions): Observable<Plan[]> {
    this.loading.next(true);
    return this.httpClient
      .get<Attempt<Plan[]>>(
        `${this.config.apiUrl}/plans`,
        options?.getRequestOptions()
      )
      .pipe(
        map((response: Attempt<Plan[]>) => {
          if (response.failure) return response.result;
          let items = response.result;
          items.forEach((plan: Plan) => this.setUnitAndPrice(plan));
          this.items.next(items);
          return items;
        }),
        finalize(() => this.loading.next(false))
      );
  }

  registerInterest(id: number, options?: RequestOptions): Observable<void> {
    return this.httpClient
      .post<Attempt<void>>(
        `${this.config.apiUrl}/${this.endpoint}/${id}/interested`,
        options?.getRequestOptions()
      )
      .pipe(
        map((response: Attempt<void>) => {
          return response.result;
        })
      );
  }

  private setUnitAndPrice(plan: Plan): void {
    if (!plan.lines?.length) return;

    let unitCount = 0;
    let price = 0;

    plan.lines.forEach((line: Line) => {
      unitCount = unitCount + line.quantity;
      price = price + line.quantity * line.item.price;
    });

    plan.price = price;
    plan.units = unitCount;
  }
}
