import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CloudinaryModule } from '@cloudinary/angular-5.x';
import {
  ComponentConfig,
  COMPONENT_CONFIG,
} from '@situlive/angular/components';

import { ImageComponent } from './image.component';

@NgModule({
  imports: [CommonModule, CloudinaryModule],
  declarations: [ImageComponent],
  exports: [ImageComponent],
})
export class ImageModule {
  static forRoot(config: ComponentConfig): ModuleWithProviders {
    return {
      ngModule: ImageModule,
      providers: [{ provide: COMPONENT_CONFIG, useValue: config }],
    };
  }
}
