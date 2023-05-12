import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { HttpServiceConfig, HTTP_SERVICE_CONFIG } from '../configs';
import {
  Attempt,
  RequestOptions,
  SearchResult,
  SimpleResourceBase,
  Search,
} from '../models';

export class VideoSearchResponse extends SearchResult {
  items: SimpleVideo[];
}

export class SimpleVideo extends SimpleResourceBase {}

@Injectable({
  providedIn: 'root',
})
export class VideoSearchService {
  private url: string;

  public items: BehaviorSubject<SimpleVideo[]>;
  public loading: BehaviorSubject<boolean>;

  constructor(
    @Inject(HTTP_SERVICE_CONFIG) private config: HttpServiceConfig,
    public httpClient: HttpClient
  ) {
    this.items = new BehaviorSubject<SimpleVideo[]>([]);
    this.loading = new BehaviorSubject<boolean>(false);
    this.url = this.config.apiUrl + '/videos';
  }

  public search(
    request: Search,
    options?: RequestOptions
  ): Observable<VideoSearchResponse> {
    return this.httpClient
      .post<Attempt<VideoSearchResponse>>(
        `${this.url}/search`,
        request,
        options?.getRequestOptions()
      )
      .pipe(
        map((response: Attempt<VideoSearchResponse>) => {
          if (response.failure) return response.result;
          this.items.next(response.result.items);
          return response.result;
        })
      );
  }
}
