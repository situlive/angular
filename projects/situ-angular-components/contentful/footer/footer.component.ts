import { Component, OnInit, Input } from '@angular/core';

import { Menu } from '../_core/models';
import { ContentfulService } from '../_core/services';

@Component({
  selector: 'situ-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  @Input() hideCookiePreferences: Boolean;

  public section: Menu;

  constructor(private contentfulService: ContentfulService) {}

  ngOnInit(): void {
    this.getComponent();
  }

  private getComponent(): void {
    this.contentfulService
      .getFooter()
      .subscribe((footer: Menu) => (this.section = footer));
  }
}
