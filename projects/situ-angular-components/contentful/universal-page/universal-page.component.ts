import { OnInit } from '@angular/core';
import { NavigationEnd } from '@angular/router';

import { PageComponent } from '../page/page.component';

export class UniversalPageComponent extends PageComponent implements OnInit {
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
