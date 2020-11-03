import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BrowserTransferStateModule } from '@angular/platform-browser';

import { CORE_CONFIG, CoreConfig } from '@configs';

@NgModule({
  imports: [CommonModule, RouterModule, BrowserTransferStateModule],
})
export class CoreModule {
  static forRoot(config: CoreConfig): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [{ provide: CORE_CONFIG, useValue: config }],
    };
  }
}
