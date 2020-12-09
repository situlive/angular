import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CloudinaryModule } from '@cloudinary/angular-5.x';

import { ImageComponent } from './image/image.component';
import { BackgroundImageComponent } from './background-image/background-image.component';

@NgModule({
  declarations: [ImageComponent, BackgroundImageComponent],
  exports: [ImageComponent, BackgroundImageComponent],
  imports: [CommonModule, CloudinaryModule],
})
export class ImagesModule {}
