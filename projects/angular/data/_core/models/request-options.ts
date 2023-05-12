import { HttpHeaders } from '@angular/common/http';

export class RequestOptions {
  public silent?: boolean;
  public skip?: number;
  public take?: number;

  public constructor(silent: boolean) {
    this.silent = silent;
  }

  public getRequestOptions(): { headers?: HttpHeaders } {
    if (!this.silent) return {};
    return {
      headers: new HttpHeaders({
        'Silent-Request': 'true',
      }),
    };
  }
}
