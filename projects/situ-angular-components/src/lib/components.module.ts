import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HttpServiceConfig, HTTP_SERVICE_CONFIG } from './_core/configs';
import { CoreModule } from './_core/core.module';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { HeaderComponent } from './header/header.component';
import { LoaderComponent } from './loader/loader.component';

@NgModule({
  imports: [CoreModule, CommonModule, RouterModule],
  declarations: [BreadcrumbComponent, HeaderComponent, LoaderComponent],
  exports: [BreadcrumbComponent, HeaderComponent, LoaderComponent],
})
export class ComponentsModule {
  static forRoot(config: HttpServiceConfig): ModuleWithProviders {
    return {
      ngModule: ComponentsModule,
      providers: [{ provide: HTTP_SERVICE_CONFIG, useValue: config }],
    };
  }
}
