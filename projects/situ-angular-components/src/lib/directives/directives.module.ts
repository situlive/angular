import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { MatButtonLoadingDirective } from './mat-button-loading.directive';

@NgModule({
  declarations: [MatButtonLoadingDirective],
  exports: [MatButtonLoadingDirective],
  imports: [CommonModule, MatButtonModule, MatProgressSpinnerModule],
})
export class DirectivesModule {}
