import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonLoadingDirective } from './directives/mat-button-loading.directive';

import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  imports: [CommonModule, RouterModule, MatButtonModule, MatProgressBarModule],
  declarations: [FooterComponent, HeaderComponent, MatButtonLoadingDirective],
  exports: [FooterComponent, HeaderComponent, MatButtonLoadingDirective],
})
export class SituAngularComponentsModule {}
