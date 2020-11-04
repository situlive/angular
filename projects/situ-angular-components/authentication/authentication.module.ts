import { ModuleWithProviders, NgModule } from '@angular/core';

import { CoreModule } from './_core/core.module';
import { AuthConfig, AUTH_CONFIG } from './_core/configs';

@NgModule({
  imports: [CoreModule],
})
export class AuthModule {
  static forRoot(config: AuthConfig): ModuleWithProviders {
    return {
      ngModule: AuthModule,
      providers: [{ provide: AUTH_CONFIG, useValue: config }],
    };
  }
}
