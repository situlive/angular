import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CloudinaryModule } from '@cloudinary/angular-5.x';

import { BackgroundVideoComponent } from './background-video.component';

@NgModule({
  declarations: [BackgroundVideoComponent],
  exports: [BackgroundVideoComponent],
  imports: [CommonModule, CloudinaryModule],
})
export class BackgroundVideoModule {}
