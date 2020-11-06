import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { HttpServiceConfig, HTTP_SERVICE_CONFIG } from '../configs';
import { Transformation } from '../models';
import { BaseFeedService } from './base-feeds.service';

@Injectable({
  providedIn: 'root',
})
export class TransformationService extends BaseFeedService<Transformation> {
  constructor(
    @Inject(HTTP_SERVICE_CONFIG) public config: HttpServiceConfig,
    httpClient: HttpClient
  ) {
    super(config, 'transformations', httpClient);
  }
}
