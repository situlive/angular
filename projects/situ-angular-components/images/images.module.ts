import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CloudinaryModule } from '@cloudinary/angular-5.x';

import { ResponsiveBackgroundImageComponent } from './responsive-background-image/responsive-background-image.component';
import { ResponsiveImageComponent } from './responsive-image/responsive-image.component';

@NgModule({
  declarations: [ResponsiveBackgroundImageComponent, ResponsiveImageComponent],
  exports: [ResponsiveBackgroundImageComponent, ResponsiveImageComponent],
  imports: [CommonModule, CloudinaryModule],
})
export class ImagesModule {}
