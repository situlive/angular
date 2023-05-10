import { ModuleWithProviders<any>, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BrowserTransferStateModule } from '@angular/platform-browser';

import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';

import { ContentfulConfig, CONTENTFUL_CONFIG } from './_core/configs';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    BrowserTransferStateModule,

    MatButtonModule,
  ],
})
export class ContentfulModule {
  static forRoot(config: ContentfulConfig): ModuleWithProviders<any> {
    return {
      ngModule: ContentfulModule,
      providers: [{ provide: CONTENTFUL_CONFIG, useValue: config }],
    };
  }
}
