import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CloudinaryModule } from '@cloudinary/angular-5.x';
import * as Cloudinary from 'cloudinary-core';

import { ImagesConfig } from './images-config';
import { IMAGES_CONFIG } from './images-config.token';
import { ResponsiveImageComponent } from './responsive-image.component';

@NgModule({
  declarations: [ResponsiveImageComponent],
  exports: [ResponsiveImageComponent],
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
