import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CloudinaryModule } from '@cloudinary/angular-5.x';

import { ImageComponent } from './image.component';

@NgModule({
  imports: [CommonModule, CloudinaryModule],
  declarations: [ImageComponent],
  exports: [ImageComponent],
})
export class ImageModule {}
