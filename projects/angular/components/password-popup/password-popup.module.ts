import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatIconModule } from '@angular/material/icon';

import { PasswordPopupComponent } from './password-popup.component';

@NgModule({
  imports: [CommonModule, MatIconModule],
  declarations: [PasswordPopupComponent],
  exports: [PasswordPopupComponent],
})
export class PasswordPopupModule {}
