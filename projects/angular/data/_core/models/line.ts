import { Base } from './base';
import { IKey } from './key';

export enum DiscountType {
  Fixed,
  Percent,
}

export class Line extends Base implements IKey {
  id: number;
  itemId: number;
  quantity: number;
  discountType: DiscountType;
  discountAmount: number;
  discountPercent: number;
  price: number;
}
