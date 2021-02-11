import { Component, OnInit, Input } from '@angular/core';
import {
  ActivatedRoute,
  Params,
  PRIMARY_OUTLET,
  Router,
  NavigationEnd,
} from '@angular/router';
import { filter } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';

class BreadcrumbItem {
  label: string;
  params: Params;
  url: string;
}

@Component({
  selector: 'situ-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
})
export class BreadcrumbComponent implements OnInit {
  @Input() labelName: string = 'breadcrumb';
  public breadcrumbs: BreadcrumbItem[];

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.breadcrumbs = this.createBreadcrumbs(
          this.activatedRoute.root,
          event.url
        );
        //console.log(this.breadcrumbs);
      });
  }

  ngOnInit(): void {}

  private createBreadcrumbs(
    route: ActivatedRoute,
    currentUrl: string = '',
    breadcrumbs: any[] = []
  ): any[] {
    if (!route) breadcrumbs;

    const children: ActivatedRoute[] = route.children;

    if (children.length === 0) {
      return breadcrumbs;
    }
    for (const child of children) {
      if (child.outlet !== PRIMARY_OUTLET) continue;

      if (child.snapshot.component !== undefined) {
        const routeURL: string = child.snapshot.url
          .map((segment) => segment.path)
          .join('/');

        let url = currentUrl.substring(
          0,
          currentUrl.indexOf(routeURL) + routeURL.length
        );

        // console.log('routeURL', routeURL);
        // console.log('url', url);
        // console.log('currentUrl', currentUrl);

        const label = child.snapshot.data[this.labelName];

        // console.log(label);
        // console.log('--------------------------');

        if (label) {
          var match = breadcrumbs.find(
            (breadcrumb: BreadcrumbItem) => breadcrumb.label === label // TODO: The chances are we won't be reusing the label, but we might. I tried to use url, but "Home" can be "/" or "/somethingelse"
          );

          if (!match) breadcrumbs.push({ label, url });
        }
      }

      return this.createBreadcrumbs(child, currentUrl, breadcrumbs);
    }
  }
}
