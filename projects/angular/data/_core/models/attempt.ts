export class Attempt<T> {
  public success: boolean;
  public failure: boolean;
  public error: any;
  public result: T;
  public message: string;
}
