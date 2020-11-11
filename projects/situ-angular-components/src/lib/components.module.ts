import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AnimateDirective } from './_core/directives';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { HeaderComponent } from './header/header.component';
import { LoaderComponent } from './loader/loader.component';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [
    AnimateDirective,

    BreadcrumbComponent,
    HeaderComponent,
    LoaderComponent,
  ],
  exports: [
    AnimateDirective,

    BreadcrumbComponent,
    HeaderComponent,
    LoaderComponent,
  ],
})
export class ComponentsModule {}
