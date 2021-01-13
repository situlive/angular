import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HttpServiceConfig, HTTP_SERVICE_CONFIG } from './_core/configs';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [],
  exports: [],
})
export class DataModule {
  static forRoot(config: HttpServiceConfig): ModuleWithProviders {
    return {
      ngModule: DataModule,
      providers: [{ provide: HTTP_SERVICE_CONFIG, useValue: config }],
    };
  }
}
