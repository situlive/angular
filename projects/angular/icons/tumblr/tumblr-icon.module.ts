import { NgModule } from '@angular/core';

import { MatIconModule } from '@angular/material/icon';

import { TumblrIconComponent } from './tumblr-icon.component';

@NgModule({
  imports: [MatIconModule],
  declarations: [TumblrIconComponent],
  exports: [TumblrIconComponent],
})
export class TumblrIconModule {}
