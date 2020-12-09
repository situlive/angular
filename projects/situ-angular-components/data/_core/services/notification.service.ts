import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Notification } from '../models/notification';

export type cssClass =
  | 'mat-success'
  | 'mat-info'
  | 'mat-danger'
  | 'mat-warning'
  | 'mat-default';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  public notifications: BehaviorSubject<Notification[]>;

  constructor() {
    this.notifications = new BehaviorSubject<Notification[]>([]);
  }

  add(notification: Notification) {
    const notifications = this.notifications.value;
    notifications.push(notification);
    this.notifications.next(notifications);
  }
}
