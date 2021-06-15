import { Base } from './base';
import { Item } from './item';
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

  item?: Item;
}
