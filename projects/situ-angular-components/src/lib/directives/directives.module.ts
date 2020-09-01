import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonLoadingDirective } from './mat-button-loading.directive';

@NgModule({
  declarations: [MatButtonLoadingDirective],
  exports: [MatButtonLoadingDirective],
  imports: [CommonModule],
})
export class DirectivesModule {}
