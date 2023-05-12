import { Base } from './base';
import { IKey } from './key';

export enum LinkType {
  Facebook,
  Instagram,
  LinkedIn,
  Snapchat,
  TikTok,
  Twitter,
  WhatsApp,
  Youtube,
}

export class SocialLink extends Base implements IKey {
  id: number;
  brandId: number;
  order: number;
  type: LinkType;
  url: string;
}
