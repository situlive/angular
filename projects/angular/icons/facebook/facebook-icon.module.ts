import { NgModule } from '@angular/core';

import { MatIconModule } from '@angular/material/icon';

import { FacebookIconComponent } from './facebook-icon.component';

@NgModule({
  imports: [MatIconModule],
  declarations: [FacebookIconComponent],
  exports: [FacebookIconComponent],
})
export class FacebookIconModule {}
