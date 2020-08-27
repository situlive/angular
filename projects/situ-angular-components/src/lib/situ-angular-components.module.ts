import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { LoaderComponent } from './loader/loader.component';

import { MatButtonLoadingDirective } from './mat-button-loading.directive';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
  declarations: [
    FooterComponent,
    HeaderComponent,
    LoaderComponent,
    MatButtonLoadingDirective,
  ],
  exports: [
    FooterComponent,
    HeaderComponent,
    LoaderComponent,
    MatButtonLoadingDirective,
  ],
})
export class SituAngularComponentsModule {}
