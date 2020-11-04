import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { MatButtonLoadingDirective } from './directives/mat-button-loading.directive';

@NgModule({
  imports: [CommonModule, MatButtonModule, MatProgressSpinnerModule],
  declarations: [MatButtonLoadingDirective],
  exports: [MatButtonLoadingDirective],
})
export class CoreModule {}
