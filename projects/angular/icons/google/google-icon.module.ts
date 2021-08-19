import { NgModule } from '@angular/core';

import { MatIconModule } from '@angular/material/icon';

import { GoogleIconComponent } from './google-icon.component';

@NgModule({
  imports: [MatIconModule],
  declarations: [GoogleIconComponent],
  exports: [GoogleIconComponent],
})
export class GoogleIconModule {}
