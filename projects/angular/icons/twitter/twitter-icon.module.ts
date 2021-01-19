import { NgModule } from '@angular/core';

import { MatIconModule } from '@angular/material/icon';

import { TwitterIconComponent } from './twitter-icon.component';

@NgModule({
  imports: [MatIconModule],
  declarations: [TwitterIconComponent],
  exports: [TwitterIconComponent],
})
export class TwitterIconModule {}
