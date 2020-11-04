import { Inject, Injectable } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Observable, from } from 'rxjs';

import { createClient, Entry } from 'contentful';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { INLINES, BLOCKS } from '@contentful/rich-text-types';

import { Content, Image, Menu, MenuItem, Page } from '../models';
import { ContentfulConfig, CONTENTFUL_CONFIG } from '../configs';
import { HrefService } from './href.service';
import { TransferHttpService } from '@core';

@Injectable({
  providedIn: 'root',
})
export class ContentfulService {
  private client = createClient({
    space: this.config.spaceId,
    accessToken: this.config.accessToken,
    adapter: async (config: any) => {
      config.adapter = null;
      const response = await this.http
        .request(config.method, `${config.baseURL}/${config.url}`, {
          headers: {
            Accept: config.headers['Accept'],
            Authorization: config.headers['Authorization'],
            'Content-Type': config.headers['Content-Type'],
            'X-Contentful-User-Agent':
              config.headers['X-Contentful-User-Agent'],
          },
          params: config.params,
        })
        .toPromise();
      return {
        data: response,
      };
    },
  });

  constructor(
    @Inject(CONTENTFUL_CONFIG) private config: ContentfulConfig,
    private http: TransferHttpService,
    private sanitizer: DomSanitizer,
    private hrefService: HrefService
  ) {}

  public htmlToString(text: any): SafeHtml {
    const renderOptions = {
      renderNode: {
        [BLOCKS.EMBEDDED_ASSET]: (node) =>
          `<img class="img-fluid mb-4" src="${node.data.target.fields.file.url}"/>`,
        [BLOCKS.HEADING_1]: (node) => this.parseContent(node),
        [BLOCKS.HEADING_2]: (node) => this.parseContent(node),
        [BLOCKS.HEADING_3]: (node) => this.parseContent(node),
        [BLOCKS.HEADING_4]: (node) => this.parseContent(node),
        [BLOCKS.HEADING_5]: (node) => this.parseContent(node),
        [BLOCKS.HEADING_6]: (node) => this.parseContent(node),
        [BLOCKS.PARAGRAPH]: (node) => this.parseContent(node),
        [BLOCKS.UL_LIST]: (node) => this.parseList(node),
        [BLOCKS.OL_LIST]: (node) => this.parseList(node),
        [INLINES.HYPERLINK]: (node) => `<p>${this.formatHyperLink(node)}</p>`,
      },
    };

    const content = documentToHtmlString(text, renderOptions);

    return this.sanitizer.bypassSecurityTrustHtml(content);
  }

  public getMetadata(): Observable<any> {
    return from(
      this.client
        .getEntries({ content_type: 'metadata' })
        .then((response: any) => response.items[0])
    );
  }

  public getPages(): Observable<Page[]> {
    return from(
      this.client
        .getEntries({ content_type: 'page', include: 3 })
        .then((response: any) => {
          let pages = response.items.map((item) =>
            this.createPage(item, this.createContent)
          );
          return pages;
        })
    );
  }

  public getNavigation(): Observable<Menu> {
    return from(
      this.client
        .getEntries({ content_type: 'navigationMenu' })
        .then((response: any) => this.createMenu(response.items[0]))
    );
  }

  async getFooter(): Promise<any> {
    const response = await this.client.getEntries({
      content_type: 'footer',
      include: 2,
    });
    return response.items[0];
  }

  public createImage(images: any[]): Image {
    if (!images) return new Image();
    let image = Array.isArray(images) ? images[0] : images;
    return {
      publicId: image.public_id,
      secureUrl: image.secure_url,
    };
  }

  private parseList(node: any): string {
    return `<ul>${node.content
      .map((item: any) => this.parseListItem(item))
      .join('')}</ul>`;
  }

  private parseListItem(item: any): string {
    return `<li>${item.content[0].content
      .map((item: any) => this.formatMarks(item))
      .join('')}</li>`;
  }

  private parseContent(node: any): string {
    let text = '';

    node.content.forEach((content: any) => (text += this.next(content)));

    return this.formatText(node.nodeType, text);
  }

  private next(content: any): string {
    switch (content.nodeType) {
      case 'hyperlink':
        return this.formatHyperLink(content);
      case 'text':
        return this.formatMarks(content);
      default:
        return content.value;
    }
  }

  private openMarks = {
    bold: true,
    italic: true,
    underline: true,
  };

  private formatMarks(item: any): string {
    var marks = item.marks.map((item: any) => item.type);
    var text = item.value;

    marks.forEach((mark: string) => {
      switch (mark) {
        case 'bold':
          text = this.formatMark('strong', text, this.openMarks.bold);
          if (!item.value) this.openMarks.bold = !this.openMarks.bold;
          break;
        case 'italic':
          text = this.formatMark('i', text, this.openMarks.italic);
          if (!item.value) this.openMarks.italic = !this.openMarks.italic;
          break;
        case 'underline':
          text = this.formatMark('u', text, this.openMarks.underline);
          if (!item.value) this.openMarks.underline = !this.openMarks.underline;
          break;
      }
    });

    return text;
  }

  private formatMark(mark: string, text: string, isOpen: boolean) {
    if (text) return `<${mark}>${text}</${mark}>`;

    return isOpen ? `<${mark}>` : `</${mark}>`;
  }

  private formatHyperLink(content: any) {
    const email = this.hrefService.isEmail(content.data.uri);
    let text = content.content.find(
      (content: any) => content.nodeType === 'text'
    );

    if (email) {
      return `<a href="${content.data.uri}" data-category="contact" data-action="email">${text.value}</a>`;
    }

    const outbound = this.hrefService.isExternal(content.data.uri);

    if (outbound) {
      return `<a href="${content.data.uri}" data-category="navigate" data-action="outbound link">${text.value}</a>`;
    } else {
      return `<a routerLink="${content.data.uri}" data-category="navigate" data-action="inbound link">${text.value}</a>`;
    }
  }

  private formatText(type: string, text: string): string {
    switch (type) {
      case 'heading-1':
        return `<h1>${this.replaceIcons(text)}</h1>`;
      case 'heading-2':
        return `<h2>${this.replaceIcons(text)}</h2>`;
      case 'heading-3':
        return `<h3>${this.replaceIcons(text)}</h3>`;
      case 'heading-4':
        return `<h4>${this.replaceIcons(text)}</h4>`;
      case 'heading-5':
        return `<h5>${this.replaceIcons(text)}</h5>`;
      case 'heading-6':
        return `<h6>${this.replaceIcons(text)}</h6>`;
      default:
        return `<p>${text}</p>`;
    }
  }

  private replaceIcons(text: string): string {
    let indexOf = text.indexOf(':');

    if (indexOf === -1) return text;

    while (indexOf < text.length - 1) {
      let result = this.replaceWithMaterialIcons(indexOf, text);
      indexOf = result.lastIndex;
      text = result.replacedText;
    }

    return text;
  }

  private replaceWithMaterialIcons(
    start: number,
    text: string
  ): { lastIndex: number; replacedText: string } {
    let indexes = [];

    for (let i = 0; i < text.length; i++) {
      if (i < start) continue;
      if (text[i] === ':') indexes.push(i);
      if (indexes.length == 2) continue;
    }

    if (indexes.length !== 2)
      return { lastIndex: text.length - 1, replacedText: text };

    let textToReplace = text.substring(indexes[0] + 1, indexes[1]);
    let replacedText = text.replace(
      `:${textToReplace}:`,
      `<span class="material-icons">${textToReplace}</span>`
    );
    let lastIndex = indexes[1];

    return { lastIndex, replacedText };
  }

  private createMenu(menu: any): Menu {
    return {
      title: menu.fields.title,
      links: menu.fields.links.map(this.createMenuItem),
      externalLinks: menu.fields.externalLinks?.map((item: any) => {
        return { name: item.fields.name, url: item.fields.url };
      }),
      buttons: menu.fields.buttons,
    };
  }

  private createMenuItem(item: any): MenuItem {
    return {
      path: item.fields.path,
      text: item.fields.linkText,
    };
  }

  private createPage(page: Entry<any>, createContent: any): Page {
    return {
      title: page.fields['title'],
      slug: page.fields['path'],
      linkText: page.fields['linkText'],
      content: page.fields['content'].map(createContent),
    };
  }

  private createContent(component: Entry<any>): Content {
    return {
      type: component.sys.contentType.sys.id,
      fields: component.fields,
    };
  }
}
