import { NgModule } from '@angular/core';

import { AnimateDirective } from './animations/animate.directive';

@NgModule({
  declarations: [AnimateDirective],
  exports: [AnimateDirective],
})
export class CoreModule {}
