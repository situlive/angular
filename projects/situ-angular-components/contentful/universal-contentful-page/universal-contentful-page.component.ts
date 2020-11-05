import { OnInit } from '@angular/core';
import { NavigationEnd } from '@angular/router';

import { ContentfulPageComponent } from '../contentful-page/contentful-page.component';

export class UniversalContentfulPageComponent
  extends ContentfulPageComponent
  implements OnInit {
  constructor() {
    super();
  }

  ngOnInit(): void {
    super.ngOnInit();

    this.onRouteChange();
  }

  private onRouteChange(): void {
    this.router.events.subscribe((event: any) => {
      if (!(event instanceof NavigationEnd)) return;

      this.pageService.setMetadata();
    });
  }
}
