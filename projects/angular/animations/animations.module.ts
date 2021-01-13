import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnimateDirective } from './_core/directives';

@NgModule({
  imports: [CommonModule],
  declarations: [AnimateDirective],
  exports: [AnimateDirective],
})
export class AnimationsModule {}
