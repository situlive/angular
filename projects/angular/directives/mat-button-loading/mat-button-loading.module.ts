import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyProgressSpinnerModule as MatProgressSpinnerModule } from '@angular/material/legacy-progress-spinner';

import { MatButtonLoadingDirective } from './mat-button-loading.directive';

@NgModule({
  imports: [CommonModule, MatButtonModule, MatProgressSpinnerModule],
  declarations: [MatButtonLoadingDirective],
  exports: [MatButtonLoadingDirective],
})
export class MatButtonLoadingModule {}
