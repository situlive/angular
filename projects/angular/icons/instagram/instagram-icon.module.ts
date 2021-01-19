import { NgModule } from '@angular/core';

import { MatIconModule } from '@angular/material/icon';

import { InstagramIconComponent } from './instagram-icon.component';

@NgModule({
  imports: [MatIconModule],
  declarations: [InstagramIconComponent],
  exports: [InstagramIconComponent],
})
export class InstagramIconModule {}
