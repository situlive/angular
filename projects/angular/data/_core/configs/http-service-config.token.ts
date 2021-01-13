import { InjectionToken } from '@angular/core';
import { HttpServiceConfig } from './http-service-config';

export const HTTP_SERVICE_CONFIG = new InjectionToken<HttpServiceConfig>(
  'HTTP_SERVICE_CONFIG'
);
