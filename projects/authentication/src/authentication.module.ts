import { ModuleWithProviders, NgModule } from '@angular/core';

import { CoreModule } from './_core/core.module';
import { AuthConfig, AUTH_CONFIG } from './_core/configs';

@NgModule({
  imports: [CoreModule],
})
export class ContentfulModule {
  static forRoot(config: AuthConfig): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [{ provide: AUTH_CONFIG, useValue: config }],
    };
  }
}
