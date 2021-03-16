import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { HttpServiceConfig, HTTP_SERVICE_CONFIG } from '../configs';
import { DemoUnit } from '../models';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class DemoUnitService extends BaseService<DemoUnit> {
  constructor(
    @Inject(HTTP_SERVICE_CONFIG) public config: HttpServiceConfig,
    public httpClient: HttpClient
  ) {
    super(config, 'demoUnits', httpClient);
  }
}
