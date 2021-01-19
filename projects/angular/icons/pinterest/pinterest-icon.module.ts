import { NgModule } from '@angular/core';

import { MatIconModule } from '@angular/material/icon';

import { PinterestIconComponent } from './pinterest-icon.component';

@NgModule({
  imports: [MatIconModule],
  declarations: [PinterestIconComponent],
  exports: [PinterestIconComponent],
})
export class PinterestIconModule {}
