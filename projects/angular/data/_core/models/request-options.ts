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

    const headers = new HttpHeaders();
    headers.append('Silent-Request', 'true');
    return { headers: headers };
  }
}
