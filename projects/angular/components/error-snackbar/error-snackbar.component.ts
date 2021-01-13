import { Component, Input, OnInit } from '@angular/core';

import { Notification, NotificationService } from '@situlive/angular/data';

import { SnackBarService } from './snack-bar.service';

@Component({
  selector: 'situ-error-snackbar',
  templateUrl: './error-snackbar.component.html',
  styleUrls: ['./error-snackbar.component.scss'],
})
export class ErrorSnackbarComponent implements OnInit {
  @Input() duration: number = 5000;

  public constructor(
    private notificationService: NotificationService,
    private snackbarService: SnackBarService
  ) {}

  public ngOnInit(): void {
    this.notificationService.notifications.subscribe(
      (notifications: Notification[]) =>
        notifications.forEach((notification: Notification) =>
          this.snackbarService.show(notification)
        )
    );
  }
}
