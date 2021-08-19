import { NgModule } from '@angular/core';

import { MatIconModule } from '@angular/material/icon';

import { LinkedinIconComponent } from './linkedin-icon.component';

@NgModule({
  imports: [MatIconModule],
  declarations: [LinkedinIconComponent],
  exports: [LinkedinIconComponent],
})
export class LinkedinIconModule {}
