import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { HttpServiceConfig, HTTP_SERVICE_CONFIG } from '../configs';
import { DemoUnitLocation } from '../models';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class DemoUnitLocationService extends BaseService<DemoUnitLocation> {
  constructor(
    @Inject(HTTP_SERVICE_CONFIG) public config: HttpServiceConfig,
    public httpClient: HttpClient
  ) {
    super(config, 'demoUnitLocations', httpClient);
  }
}
