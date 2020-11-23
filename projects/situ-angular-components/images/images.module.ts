import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CloudinaryModule } from '@cloudinary/angular-5.x';
import * as Cloudinary from 'cloudinary-core';

import { CloudinaryConfig, CLOUDINARY_CONFIG } from './_core/configs';
import { ResponsiveBackgroundImageComponent } from './responsive-background-image/responsive-background-image.component';
import { ResponsiveImageComponent } from './responsive-image/responsive-image.component';

@NgModule({
  declarations: [ResponsiveBackgroundImageComponent, ResponsiveImageComponent],
  exports: [
    ResponsiveBackgroundImageComponent,
    ResponsiveImageComponent,
    CloudinaryModule,
  ],
  imports: [CommonModule, CloudinaryModule],
})
export class ImagesModule {
  static forRoot(config: CloudinaryConfig): ModuleWithProviders {
    return {
      ngModule: ImagesModule,
      providers: [
        { provide: CLOUDINARY_CONFIG, useValue: config },
        ...CloudinaryModule.forRoot(Cloudinary, {
          cloud_name: config.cloudName,
        }).providers,
      ],
    };
  }
}
