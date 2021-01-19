import { Injectable, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

import { NotificationService, Notification } from '@situlive/angular/data';
import { ErrorSnackbarComponent } from '@situlive/angular/components/error-snackbar';

@Injectable({
  providedIn: 'root',
})
export class SnackBarService implements OnDestroy {
  private subscription: Subscription;

  constructor(
    private snackBar: MatSnackBar,
    private notificationService: NotificationService
  ) {}

  public ngOnDestroy(): void {
    this.subscription && this.subscription.unsubscribe();
  }

  public initialize(): void {
    console.log('subscribing');
    this.subscription = this.notificationService.notifications.subscribe(
      (notifications: Notification[]) =>
        notifications.forEach((notification: Notification) =>
          this.show(notification)
        )
    );
  }

  public show(notifcation: any): void {
    let config: MatSnackBarConfig = {
      panelClass: notifcation.type,
      verticalPosition: 'top',
      duration: 5000,
      data: notifcation.message,
    };

    this.snackBar.openFromComponent(ErrorSnackbarComponent, config);
  }
}
