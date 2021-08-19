import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CloudinaryModule } from '@cloudinary/angular-5.x';
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
  static forRoot(config: ComponentConfig): ModuleWithProviders {
    return {
      ngModule: ImageModule,
      providers: [{ provide: COMPONENT_CONFIG, useValue: config }],
    };
  }
}
