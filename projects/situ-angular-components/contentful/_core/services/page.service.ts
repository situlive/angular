import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

import { Image } from '../models';
import { ContentfulService } from './contentful.service';

class Metadata {
  prefix: string;
  title: string;
  description: string;
  image: Image;
}

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

  public setMetadata(): void {
    this.contentfulService.getMetadata().subscribe((response) => {
      let metadata = this.createMetadata(response);

      let title = metadata.title;
      let description = metadata.description;
      let image = metadata.image.secureUrl;

      this.meta.updateTag({
        property: `${metadata.prefix}:site_name`,
        content: metadata.title,
      });
      this.meta.updateTag({
        property: `${metadata.prefix}:title`,
        content: title,
      });
      this.meta.updateTag({
        property: `${metadata.prefix}:image`,
        content: image,
      });
      this.meta.updateTag({
        property: `${metadata.prefix}:description`,
        content: description,
      });
      this.meta.updateTag({ name: 'description', content: description });
    });
  }

  private createMetadata(content: any): Metadata {
    return {
      prefix: content.fields.prefix,
      title: content.fields.title,
      description: content.fields.description,
      image: this.contentfulService.createImage(content.fields.image),
    };
  }
}
