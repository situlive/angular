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
  @Input() dataName: string = 'breadcrumb';
  @Input() affix: string;
  @Input() root: ActivatedRoute;
  public breadcrumbs: BreadcrumbItem[];

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.breadcrumbs = this.createBreadcrumbs(this.activatedRoute.root);
      });
  }

  ngOnInit(): void {}

  private createBreadcrumbs(
    route: ActivatedRoute,
    url: string = '',
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
        if (routeURL !== '') {
          url += `/${routeURL}`;
        }

        const label = child.snapshot.data[this.dataName];
        const params = child.snapshot.params;
        if (!isNullOrUndefined(label)) {
          if (this.affix) url = `/${this.affix}/${url}`;

          var match = breadcrumbs.find(
            (breadcrumb: BreadcrumbItem) => breadcrumb.url === url
          );

          if (!match) breadcrumbs.push({ label, params, url });
        }
      }

      return this.createBreadcrumbs(child, url, breadcrumbs);
    }
  }
}
