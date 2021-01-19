import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { DataModule } from '@situlive/angular/data';

import { ErrorSnackbarComponent } from './error-snackbar.component';

@NgModule({
  imports: [MatButtonModule, MatIconModule, MatSnackBarModule, DataModule],
  declarations: [ErrorSnackbarComponent],
  exports: [ErrorSnackbarComponent],
})
export class ErrorSnackbarModule {}
