import { Injectable, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

import { NotificationService, Notification } from '@situlive/angular/data';

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

  public show(notification: any): void {
    let config: MatSnackBarConfig = {
      panelClass: notification.type,
      verticalPosition: 'top',
      duration: 5000,
    };

    this.snackBar.open(notification.message, null, config);
  }
}
