import { Component, Inject, Input, OnInit } from '@angular/core';

import {
  MatSnackBarRef,
  MAT_SNACK_BAR_DATA,
} from '@angular/material/snack-bar';

@Component({
  selector: 'situ-error-snackbar',
  templateUrl: './error-snackbar.component.html',
  styleUrls: ['./error-snackbar.component.scss'],
})
export class ErrorSnackbarComponent implements OnInit {
  @Input() duration: number = 5000;

  public constructor(
    @Inject(MAT_SNACK_BAR_DATA) public message: string,
    public snackBarRef: MatSnackBarRef<ErrorSnackbarComponent>
  ) {}

  public ngOnInit(): void {}

  public close(): void {
    this.snackBarRef.dismiss();
  }
}
