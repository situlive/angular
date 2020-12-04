import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CloudinaryModule } from '@cloudinary/angular-5.x';

import { ResponsiveBackgroundVideoComponent } from './responsive-background-video/responsive-background-video.component';

@NgModule({
  declarations: [ResponsiveBackgroundVideoComponent],
  exports: [ResponsiveBackgroundVideoComponent],
  imports: [CommonModule, CloudinaryModule],
})
export class VideosModule {}
