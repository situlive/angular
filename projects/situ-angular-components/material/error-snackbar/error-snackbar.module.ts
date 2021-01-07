import { NgModule } from '@angular/core';

import { MatSnackBarModule } from '@angular/material/snack-bar';

import { DataModule } from '@situlive/situ-angular-components/data';

import { ErrorSnackbarComponent } from './error-snackbar.component';

@NgModule({
  imports: [MatSnackBarModule, DataModule],
  declarations: [ErrorSnackbarComponent],
  exports: [ErrorSnackbarComponent],
})
export class ErrorSnackbarModule {}