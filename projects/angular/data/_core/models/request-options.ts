import { HttpHeaders } from '@angular/common/http';

export class RequestOptions {
  silent?: boolean;
  skip?: number;
  take?: number;

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
