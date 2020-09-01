import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { LoaderComponent } from './loader.component';

@NgModule({
  declarations: [LoaderComponent],
  exports: [LoaderComponent],
  imports: [CommonModule, MatButtonModule, MatProgressSpinnerModule],
})
export class LoaderModule {}
