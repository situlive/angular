import { ModuleWithProviders<any>, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CloudinaryModule } from '@cloudinary/ng';
import {
  ComponentConfig,
  COMPONENT_CONFIG,
} from '@situlive/angular/components';
import { ImageModule } from '@situlive/angular/components/image';

import { BackgroundImageComponent } from './background-image.component';

@NgModule({
  imports: [CommonModule, CloudinaryModule, ImageModule],
  declarations: [BackgroundImageComponent],
  exports: [BackgroundImageComponent],
})
export class BackgroundImageModule {
  static forRoot(config: ComponentConfig): ModuleWithProviders<any> {
    return {
      ngModule: ImageModule,
      providers: [{ provide: COMPONENT_CONFIG, useValue: config }],
    };
  }
}
