import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BrowserTransferStateModule } from '@angular/platform-browser';

import { MatButtonModule } from '@angular/material/button';

import { ContentfulConfig, CONTENTFUL_CONFIG } from './_core/configs';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    BrowserTransferStateModule,

    MatButtonModule,
  ],
  declarations: [FooterComponent],
  exports: [FooterComponent],
})
export class ContentfulModule {
  static forRoot(config: ContentfulConfig): ModuleWithProviders {
    return {
      ngModule: ContentfulModule,
      providers: [{ provide: CONTENTFUL_CONFIG, useValue: config }],
    };
  }
}
