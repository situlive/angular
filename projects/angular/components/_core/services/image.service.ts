import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { Attempt } from '@situlive/angular/data';

import { ComponentConfig, COMPONENT_CONFIG } from '../configs';
import { ImageContext } from '../models';

class ContextItem {
  publicId: string;
  data: ImageContext;
}

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  public cloudName: string;
  private context: ContextItem[] = [];

  constructor(
    @Inject(COMPONENT_CONFIG) private config: ComponentConfig,
    private httpClient: HttpClient
  ) {
    this.cloudName = config.cloudName;
  }

  public getAltTag(publicId: string): Observable<ImageContext> {
    let existing = this.context.find(
      (item: ContextItem) => item.publicId === publicId
    );
    if (existing) return of(existing.data);

    return this.getContextData(publicId).pipe(
      map((response: ImageContext) => {
        this.context.push({ publicId: publicId, data: response });
        return response;
      })
    );
  }

  private getContextData(publicId: string): Observable<ImageContext> {
    return this.httpClient
      .get<Attempt<ImageContext>>(
        `${this.config.apiUrl}/images/context?publicId=${publicId}`
      )
      .pipe(
        map((response: Attempt<ImageContext>) => {
          if (response.failure) return response.result;
          return response.result;
        })
      );
  }
}
