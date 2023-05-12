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
  public id: number;
  public brandId: number;
  public order: number;
  public type: LinkType;
  public url: string;
}
