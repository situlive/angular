import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { HttpServiceConfig, HTTP_SERVICE_CONFIG } from '../configs';
import { Inclusion } from '../models';
import { BaseFeedService } from './base-feeds.service';

@Injectable({
  providedIn: 'root',
})
export class ExclusionService extends BaseFeedService<Inclusion> {
  constructor(
    @Inject(HTTP_SERVICE_CONFIG) public config: HttpServiceConfig,
    httpClient: HttpClient
  ) {
    super(config, 'exclusions', httpClient);
  }
}
