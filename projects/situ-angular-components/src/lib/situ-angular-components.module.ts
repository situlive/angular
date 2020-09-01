import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatButtonLoadingDirective } from './directives/mat-button-loading.directive';
import { AnimationsModule } from './animations/animations.module';
import { FooterModule } from './footer/footer.module';
import { HeaderModule } from './header/header.module';
import { LoaderModule } from './loader/loader.module';
import { DirectivesModule } from './directives/directives.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,

    AnimationsModule,
    DirectivesModule,
    FooterModule,
    HeaderModule,
    LoaderModule,
  ],
})
export class SituAngularComponentsModule {}
