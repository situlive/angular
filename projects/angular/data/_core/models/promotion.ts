import { Base } from './base';
import { IKey } from './key';

export enum PromotionType {
  Offer,
  Advert,
}

export class Promotion extends Base implements IKey {
  id: number;
  brandId: number;
  productId?: string;
  type: PromotionType;
  title: string;
  description: string;
  images?: string;
  ctaUrl: string;
  ctaText: string;
  ctaColour: string;
}
