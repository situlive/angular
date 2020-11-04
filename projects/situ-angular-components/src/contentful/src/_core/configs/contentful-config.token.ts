import { InjectionToken } from '@angular/core';
import { ContentfulConfig } from './contentful-config';

export const CONTENTFUL_CONFIG = new InjectionToken<ContentfulConfig>(
  'CONTENTFUL_CONFIG'
);
