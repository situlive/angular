import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CloudinaryModule } from '@cloudinary/ng';
import {
  ComponentConfig,
  COMPONENT_CONFIG,
} from '@situlive/angular/components';

import { BackgroundVideoComponent } from './background-video.component';

@NgModule({
  declarations: [BackgroundVideoComponent],
  exports: [BackgroundVideoComponent],
  imports: [CommonModule, CloudinaryModule],
})
export class BackgroundVideoModule {
  static forRoot(config: ComponentConfig): ModuleWithProviders<any> {
    return {
      ngModule: BackgroundVideoModule,
      providers: [{ provide: COMPONENT_CONFIG, useValue: config }],
    };
  }
}
