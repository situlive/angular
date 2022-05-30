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

export class SocialLink {
  id: number;
  brandId: number;
  order: number;
  type: LinkType;
  url: string;
}
