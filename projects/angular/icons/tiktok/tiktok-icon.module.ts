import { NgModule } from '@angular/core';

import { MatIconModule } from '@angular/material/icon';

import { TiktokIconComponent } from './tiktok-icon.component';

@NgModule({
  imports: [MatIconModule],
  declarations: [TiktokIconComponent],
  exports: [TiktokIconComponent],
})
export class TiktokIconModule {}
