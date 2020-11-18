import { OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

import { PageService } from '../_core/services';
import { ContentfulPageComponent } from '../contentful-page/contentful-page.component';

export class UniversalContentfulPageComponent
  extends ContentfulPageComponent
  implements OnInit {
  constructor(router: Router, pageService: PageService) {
    super(router, pageService);
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
