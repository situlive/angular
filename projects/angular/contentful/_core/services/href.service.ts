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

  public getQueryParams(url: string): string {
    let routes = url.split('?');
    let query = routes.length > 1 ? routes[1] : '';
    let params = query ? this.getParams(query) : undefined;
    return params;
  }

  public getHref(url: string): string {
    let routes = url.split('?');
    let routeWithoutQuery = routes[0];

    let fragments = routeWithoutQuery.split('#');
    return fragments[0];
  }

  private getParams(query: string): any {
    let params = query.split('=');
    let key = params[0];
    let value = params.length > 1 ? params[1] : '';
    return JSON.parse(`{ "${key}": "${value}" }`);
  }
}
