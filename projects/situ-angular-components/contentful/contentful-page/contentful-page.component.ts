import { Input, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

import { Page } from '../_core/models';
import { PageService } from '../_core/services/page.service';

export class ContentfulPageComponent implements OnInit {
  private currentUrl: string = '/';

  protected router: Router;
  protected pageService: PageService;

  @Input() pages: Page[];
  public page: Page;

  constructor(router: Router, pageService: PageService) {
    this.router = router;
    this.pageService = pageService;
  }

  ngOnInit(): void {
    this.currentUrl = this.getCurrentUrl(this.router.url); // For initial page load
    this.getPage();
    this.setTitle();

    this.onNavigationEnd();
  }

  private setTitle(): void {
    this.pageService.setTitle(this.page?.title);
  }

  private getPage(): void {
    this.page = this.pages.find((page: Page) => page.slug === this.currentUrl);

    if (!this.page) {
      this.page = this.pages.find(
        (page: Page) =>
          this.currentUrl.indexOf(page.slug) === 0 && page.slug !== '/'
      );
    }
  }

  private onNavigationEnd(): void {
    this.router.events.subscribe((event: any) => {
      if (!(event instanceof NavigationEnd)) return;

      this.currentUrl = this.getCurrentUrl(event.urlAfterRedirects);

      this.getPage();
      this.setTitle();
    });
  }

  private getCurrentUrl(current: string): string {
    let urlWithoutHash = current.split('#')[0];
    let urlWithoutQuery = urlWithoutHash.split('?')[0];
    return urlWithoutQuery;
  }
}