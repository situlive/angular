import { InjectionToken } from '@angular/core';
import { CloudinaryConfig } from './cloudinary-config';

export const CLOUDINARY_CONFIG = new InjectionToken<CloudinaryConfig>('CLOUDINARY_CONFIG');
