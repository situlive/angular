import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { HttpServiceConfig, HTTP_SERVICE_CONFIG } from '../configs';
import { Rule } from '../models';
import { BaseFeedService } from './base-feeds.service';

@Injectable({
  providedIn: 'root',
})
export class RuleService extends BaseFeedService<Rule> {
  constructor(
    @Inject(HTTP_SERVICE_CONFIG) public config: HttpServiceConfig,
    httpClient: HttpClient
  ) {
    super(config, 'rules', httpClient);
  }
}
