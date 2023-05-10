import { NgModule } from '@angular/core';

import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacySnackBarModule as MatSnackBarModule } from '@angular/material/legacy-snack-bar';

import { ErrorSnackbarComponent } from './error-snackbar.component';

@NgModule({
  imports: [MatButtonModule, MatIconModule, MatSnackBarModule],
  declarations: [ErrorSnackbarComponent],
  exports: [ErrorSnackbarComponent],
})
export class ErrorSnackbarModule {}
