import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CloudinaryModule } from '@cloudinary/angular-5.x';
import { ImageModule } from '@situlive/angular/components/image';

import { BackgroundImageComponent } from './background-image.component';

@NgModule({
  imports: [CommonModule, CloudinaryModule, ImageModule],
  declarations: [BackgroundImageComponent],
  exports: [BackgroundImageComponent],
})
export class BackgroundImageModule {}
