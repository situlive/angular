import { Base } from './base';
import { IImages } from './images';
import { IKey } from './key';

export enum PromotionType {
  Offer,
  Advert,
  Voucher,
  Benefits,
  Event,
  Activity,
}

export enum PromotionValueType {
  Amount,
  Percent,
}

export class Promotion extends Base implements IKey, IImages {
  public id: number;
  public brandId: number;
  public productId?: string;
  public type: PromotionType;
  public title: string;
  public shortTitle?: string;
  public description: string;
  public images?: string;
  public folderName?: string;
  public ctaUrl: string;
  public ctaText: string;
  public ctaColour: string;
  public voucherCode?: string;
  public startDate?: string;
  public endDate?: string;
  public permanent: boolean;
  public membersOnly: boolean;
  public exclusive: boolean;
  public enabled: boolean;
  public sendEmails: boolean;
  public staticCtaUrl: boolean;
  public value?: number;
  public valueType?: PromotionValueType;
}
