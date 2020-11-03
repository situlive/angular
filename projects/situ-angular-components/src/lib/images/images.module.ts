import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CloudinaryModule } from '@cloudinary/angular-5.x';
import * as Cloudinary from 'cloudinary-core';

import { IMAGES_CONFIG } from '../_core/configs/images-config.token';
import { ImagesConfig } from '../_core/configs/images-config';

import { ResponsiveImageComponent } from './responsive-image.component';

@NgModule({
  declarations: [ResponsiveImageComponent],
  exports: [ResponsiveImageComponent, CloudinaryModule],
  imports: [CommonModule, CloudinaryModule],
})
export class ImagesModule {
  static forRoot(config: ImagesConfig): ModuleWithProviders {
    return {
      ngModule: ImagesModule,
      providers: [
        { provide: IMAGES_CONFIG, useValue: config },
        ...CloudinaryModule.forRoot(Cloudinary, {
          cloud_name: config.cloudName,
        }).providers,
      ],
    };
  }
}
