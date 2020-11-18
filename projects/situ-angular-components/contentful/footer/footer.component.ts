import { Component, OnInit, Input } from '@angular/core';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { Menu } from '../_core/models';
import { ContentfulService } from '../_core/services';

@Component({
  selector: 'situ-footer',
  templateUrl: './footer.component.html',
})
export class FooterComponent implements OnInit {
  @Input() hideCookiePreferences: Boolean;

  public section: Menu;

  constructor(private contentfulService: ContentfulService) {}

  async ngOnInit(): Promise<void> {
    await this.getComponent();
  }

  private getComponent(): void {
    this.contentfulService
      .getFooter()
      .subscribe((footer: Menu) => (this.section = footer));
  }
}
