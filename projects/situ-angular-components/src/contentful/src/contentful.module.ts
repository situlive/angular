import { ModuleWithProviders, NgModule } from '@angular/core';

import { CoreModule } from './_core/core.module';
import { ContentfulConfig, CONTENTFUL_CONFIG } from './_core/configs';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  imports: [CoreModule],
  declarations: [FooterComponent],
  exports: [FooterComponent],
})
export class ContentfulModule {
  static forRoot(config: ContentfulConfig): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [{ provide: CONTENTFUL_CONFIG, useValue: config }],
    };
  }
}
