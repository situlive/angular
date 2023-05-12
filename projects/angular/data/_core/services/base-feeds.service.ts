import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { HttpServiceConfig } from '../configs';
import { Attempt, BaseFeed, RequestOptions } from '../models';

export class BaseFeedService<T extends BaseFeed> {
  items: BehaviorSubject<T[]>;
  public loading: BehaviorSubject<boolean>;

  constructor(
    public config: HttpServiceConfig,
    public endpoint: string,
    public httpClient: HttpClient
  ) {
    this.items = new BehaviorSubject<T[]>([]);
    this.loading = new BehaviorSubject<boolean>(false);
  }

  public initialize(feedId: number, options?: RequestOptions) {
    this.loading.next(true);
    this.httpClient
      .get<Attempt<T[]>>(
        `${this.config.apiUrl}/feeds/${feedId}/${this.endpoint}`,
        options?.getRequestOptions()
      )
      .pipe(finalize(() => this.loading.next(false)))
      .subscribe((response) => {
        if (response.failure) return response.result;
        this.items.next(response.result);
        return response.result;
      });
  }

  public create(filter: any, options?: RequestOptions): Observable<T> {
    return this.httpClient
      .post<Attempt<T>>(
        `${this.config.apiUrl}/${this.endpoint}`,
        filter,
        options?.getRequestOptions()
      )
      .pipe(
        map((response: Attempt<T>) => {
          if (response.failure) return response.result;
          const message = response.message;
          const item = response.result;

          const items = this.items.value;
          items.push(item);

          this.emit(items, message);

          return response.result;
        })
      );
  }

  public update(filter: any, options?: RequestOptions): Observable<T> {
    return this.httpClient
      .put<Attempt<T>>(
        `${this.config.apiUrl}/${this.endpoint}`,
        filter,
        options?.getRequestOptions()
      )
      .pipe(
        map((response: Attempt<T>) => {
          if (response.failure) return response.result;
          const message = response.message;
          const item = response.result;

          const items = this.items.value;
          this.remove(items, filter.id);
          items.push(item);
          items.sort((a: any, b: any) => a.order - b.order);

          this.emit(items, message);

          return response.result;
        })
      );
  }

  public delete(id: number, options?: RequestOptions): Observable<boolean> {
    return this.httpClient
      .delete<Attempt<boolean>>(
        `${this.config.apiUrl}/${this.endpoint}/${id}`,
        options?.getRequestOptions()
      )
      .pipe(
        map((response: Attempt<boolean>) => {
          if (response.failure) return response.result;
          const items = this.items.value;
          items.forEach((item, i) => {
            if (item.id !== id) {
              return;
            }
            items.splice(i, 1);
          });
          this.emit(items, response.message);
          return response.result;
        })
      );
  }

  private remove(items: T[], id: number) {
    items.forEach((item, i) => {
      if (item.id !== id) {
        return;
      }
      items.splice(i, 1);
    });
  }

  private emit(items: T[], message: string) {
    // TODO: add to a global notification service
    this.items.next(items);
  }
}
