import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HrefService {
  constructor() {}

  public isExternal(url: string): boolean {
    const links = url.split('#');
    const href = links[0] || '.';

    return (
      href.indexOf('http://') === 0 ||
      href.indexOf('https://') === 0 ||
      href.indexOf('www.') === 0
    );
  }

  public isEmail(url: string): boolean {
    return url.toLowerCase().indexOf('mailto') > -1;
  }

  public getFrament(url: string): string {
    const links = url.split('#');
    return links.length === 2 ? links[1] : '';
  }
}
