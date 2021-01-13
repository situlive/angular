import { SafeHtml } from '@angular/platform-browser';
import { MenuItem } from './menu-item';

export class Menu {
  title: string;
  content: SafeHtml;
  links: MenuItem[];
  externalLinks: any[];
  socialLinks: any[];
  buttons: any[];
}
