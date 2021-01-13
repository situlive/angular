import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { HttpServiceConfig } from '../configs';
import { Base, Attempt } from '../models';

export class BaseService<T extends Base> {
  private url: string;

  public items: BehaviorSubject<T[]>;
  public loading: BehaviorSubject<boolean>;

  constructor(
    public config: HttpServiceConfig,
    public endpoint: string,
    public httpClient: HttpClient,
    public useApi: boolean = true
  ) {
    this.items = new BehaviorSubject<T[]>([]);
    this.loading = new BehaviorSubject<boolean>(false);
    this.url = useApi ? this.config.apiUrl : this.config.identityServerUrl;
  }

  get(id: number | string): Observable<T> {
    return this.httpClient
      .get<Attempt<T>>(`${this.url}/${this.endpoint}/${id}`)
      .pipe(
        map((response: Attempt<T>) => {
          return response.result;
        })
      );
  }

  create(item: T): Observable<T> {
    return this.httpClient
      .post<Attempt<T>>(`${this.url}/${this.endpoint}`, item)
      .pipe(
        map((response: Attempt<T>) => {
          if (response.failure) return response.result;
          const newItem = response.result;
          const items = this.items.value;
          items.push(newItem);
          this.items.next(items);
          return response.result;
        })
      );
  }

  update(item: T): Observable<T> {
    return this.httpClient
      .put<Attempt<T>>(`${this.url}/${this.endpoint}`, item)
      .pipe(
        map((response: Attempt<T>) => {
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

  delete(id: number | string): Observable<boolean> {
    return this.httpClient
      .delete<Attempt<boolean>>(`${this.url}/${this.endpoint}/${id}`)
      .pipe(
        map((response: Attempt<boolean>) => {
          if (response.failure) return response.result;
          const items = this.items.value;
          this.remove(items, id);
          return response.result;
        })
      );
  }

  private remove(items: T[], id: number | string) {
    items.forEach((item, i) => {
      if (item.id !== id) {
        return;
      }
      items.splice(i, 1);
    });
  }
}
