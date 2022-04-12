import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { HttpServiceConfig } from '../configs';
import {
  Attempt,
  RequestOptions,
  SearchResult,
  SimpleResourceBase,
  Search,
} from '../models';

export class ImageSearchResponse extends SearchResult {
  items: SimpleImage[];
}

export class SimpleImage extends SimpleResourceBase {}

export class ImageSearchService {
  private url: string;

  public items: BehaviorSubject<SimpleImage[]>;
  public loading: BehaviorSubject<boolean>;

  constructor(public config: HttpServiceConfig, public httpClient: HttpClient) {
    this.items = new BehaviorSubject<SimpleImage[]>([]);
    this.loading = new BehaviorSubject<boolean>(false);
    this.url = this.config.apiUrl + '/images';
  }

  public search(
    request: Search,
    options?: RequestOptions
  ): Observable<ImageSearchResponse> {
    return this.httpClient
      .post<Attempt<ImageSearchResponse>>(
        `${this.url}/search`,
        request,
        options?.getRequestOptions()
      )
      .pipe(
        map((response: Attempt<ImageSearchResponse>) => {
          if (response.failure) return response.result;
          this.items.next(response.result.items);
          return response.result;
        })
      );
  }
}
