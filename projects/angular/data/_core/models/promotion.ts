import { Base } from './base';
import { IImages } from './images';
import { IKey } from './key';

export enum PromotionType {
  Offer,
  Advert,
  Voucher,
  Benefits,
}

export class Promotion extends Base implements IKey, IImages {
  id: number;
  brandId: number;
  productId?: string;
  type: PromotionType;
  title: string;
  shortTitle?: string;
  description: string;
  images?: string;
  folderName?: string;
  ctaUrl: string;
  ctaText: string;
  ctaColour: string;
  voucherCode?: string;
  startDate?: string;
  endDate?: string;
  permanent: boolean;
  membersOnly: boolean;
  exclusive: boolean;
  enabled: boolean;
}
