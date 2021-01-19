import { NgModule } from '@angular/core';

import { MatIconModule } from '@angular/material/icon';

import { RedditIconComponent } from './reddit-icon.component';

@NgModule({
  imports: [MatIconModule],
  declarations: [RedditIconComponent],
  exports: [RedditIconComponent],
})
export class RedditIconModule {}
