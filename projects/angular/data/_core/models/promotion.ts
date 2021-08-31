import { Base } from './base';
import { IKey } from './key';

export enum PromotionType {
  Offer,
  Advert,
}

export class Promotion extends Base implements IKey {
  public id: number;
  public brandId: number;
  public type: PromotionType;
  public title: string;
  public description: string;
  public image?: string;
  public ctaUrl: string;
  public ctaText: string;
  public ctaColour: string;
}
