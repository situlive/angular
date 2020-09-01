import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnimateDirective } from './animate.directive';

@NgModule({
  declarations: [AnimateDirective],
  exports: [AnimateDirective],
  imports: [CommonModule],
})
export class AnimationsModule {}
