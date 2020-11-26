import { OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

import { PageService } from '../_core/services';
import { ContentfulPageComponent } from '../contentful-page/contentful-page.component';
import { Page } from '../_core/models';

export class UniversalContentfulPageComponent<T extends Page>
  extends ContentfulPageComponent<T>
  implements OnInit {
  constructor(
    router: Router,
    pageService: PageService,
    callback: (page: any) => T
  ) {
    super(router, pageService, callback);
  }

  ngOnInit(): void {
    super.ngOnInit();

    this.onRouteChange();
  }

  private onRouteChange(): void {
    this.router.events.subscribe((event: any) => {
      if (!(event instanceof NavigationEnd)) return;

      this.pageService.setMetadata(this.page);
    });
  }
}
