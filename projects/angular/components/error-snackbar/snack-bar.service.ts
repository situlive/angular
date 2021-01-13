import { Injectable } from '@angular/core';

import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackBarService {
  constructor(private snackBar: MatSnackBar) {}

  show(notifcation: any, controls: boolean = true) {
    let config: MatSnackBarConfig = {
      panelClass: notifcation.type,
      verticalPosition: 'top',
      duration: 5000,
    };

    this.snackBar.open(notifcation.message, controls ? 'Close' : '', config);
  }
}
