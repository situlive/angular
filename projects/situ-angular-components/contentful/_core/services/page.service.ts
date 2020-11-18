import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

import { Metadata } from '../models';
import { ContentfulService } from './contentful.service';

@Injectable({
  providedIn: 'root',
})
export class PageService {
  constructor(
    private contentfulService: ContentfulService,
    private meta: Meta,
    private title: Title
  ) {}

  public setTitle(title: string): void {
    if (!title) return;
    this.title.setTitle(title);
  }

  public setMetadata(override?: Metadata): void {
    this.contentfulService.getMetadata().subscribe((response) => {
      let metadata = this.createMetadata(response);

      let title = override?.title ?? metadata.title;
      let description = override?.description ?? metadata.description;
      let image = override?.image?.secureUrl ?? metadata.image.secureUrl;

      this.meta.updateTag({
        property: `og:site_name`,
        content: metadata.title,
      });
      this.meta.updateTag({
        property: `og:title`,
        content: title,
      });
      this.meta.updateTag({
        property: `og:image`,
        content: image,
      });
      this.meta.updateTag({
        property: `og:description`,
        content: description,
      });
      this.meta.updateTag({ name: 'description', content: description });
    });
  }

  private createMetadata(content: any): Metadata {
    return {
      title: content.fields.title,
      description: content.fields.description,
      image: this.contentfulService.createImage(content.fields.image),
    };
  }
}
