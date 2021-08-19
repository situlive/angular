import { NgModule } from '@angular/core';

import { MatIconModule } from '@angular/material/icon';

import { YoutubeIconComponent } from './youtube-icon.component';

@NgModule({
  imports: [MatIconModule],
  declarations: [YoutubeIconComponent],
  exports: [YoutubeIconComponent],
})
export class YoutubeIconModule {}
