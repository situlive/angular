import { InjectionToken } from '@angular/core';
import { ComponentConfig } from './component-config';

export const COMPONENT_CONFIG = new InjectionToken<ComponentConfig>(
  'COMPONENT_CONFIG'
);
