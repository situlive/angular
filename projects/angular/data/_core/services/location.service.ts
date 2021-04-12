import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { HttpServiceConfig, HTTP_SERVICE_CONFIG } from '../configs';
import { Location } from '../models';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class LocationService extends BaseService<Location> {
  constructor(
    @Inject(HTTP_SERVICE_CONFIG) public config: HttpServiceConfig,
    httpClient: HttpClient
  ) {
    super(config, 'locations', httpClient);
  }
}
