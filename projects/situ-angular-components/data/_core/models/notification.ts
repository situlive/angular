export class Notification {
  message: string;
  type:
    | 'mat-success'
    | 'mat-info'
    | 'mat-danger'
    | 'mat-warning'
    | 'mat-default';
}
