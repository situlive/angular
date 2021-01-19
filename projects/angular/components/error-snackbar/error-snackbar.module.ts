import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { ErrorSnackbarComponent } from './error-snackbar.component';

@NgModule({
  imports: [MatButtonModule, MatIconModule, MatSnackBarModule],
  declarations: [ErrorSnackbarComponent],
  exports: [ErrorSnackbarComponent],
})
export class ErrorSnackbarModule {}
