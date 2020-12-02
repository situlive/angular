import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Metadata, Page } from '../models';
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

  public getPage<T extends Page>(
    slug: string,
    callback: (page: any) => T,
    options: any
  ): Observable<T> {
    return this.contentfulService.getPage(slug, callback, options);
  }

  public setTitle(title: string): void {
    if (!title) return;
    this.title.setTitle(title);
  }

  public setMetadata(override?: Metadata): void {
    this.contentfulService.getMetadata().subscribe((response) => {
      let metadata = this.createMetadata(response);

      let title = override?.title ?? metadata.title;
      let description = override?.description ?? metadata.description;
      let image = override?.image ?? metadata.image;

      this.updateFacebook({ title, description, image });
      this.updateTwitter({ title, description, image });
      this.meta.updateTag({ name: 'description', content: description });
    });
  }

  private updateTwitter(metadata: Metadata): void {
    this.meta.updateTag({
      property: `twitter:site_name`,
      content: metadata.title,
    });
    this.meta.updateTag({
      property: `twitter:title`,
      content: metadata.title,
    });
    this.meta.updateTag({
      property: `twitter:image`,
      content: metadata.image.secureUrl,
    });
    this.meta.updateTag({
      property: `twitter:description`,
      content: metadata.description,
    });
  }

  private updateFacebook(metadata: Metadata): void {
    this.meta.updateTag({
      property: `og:site_name`,
      content: metadata.title,
    });
    this.meta.updateTag({
      property: `og:title`,
      content: metadata.title,
    });
    this.meta.updateTag({
      property: `og:image`,
      content: metadata.image.secureUrl,
    });
    this.meta.updateTag({
      property: `og:description`,
      content: metadata.description,
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
