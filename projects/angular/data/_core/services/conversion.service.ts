import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { HttpServiceConfig, HTTP_SERVICE_CONFIG } from '../configs';
import { Conversion } from '../models';
import { BaseFeedService } from './base-feeds.service';

@Injectable({
  providedIn: 'root',
})
export class ConversionService extends BaseFeedService<Conversion> {
  constructor(
    @Inject(HTTP_SERVICE_CONFIG) public config: HttpServiceConfig,
    public httpClient: HttpClient
  ) {
    super(config, 'conversions', httpClient);
  }
}
