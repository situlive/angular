import { Base } from './base';
import { Item } from './item';
import { IKey } from './key';

export enum DiscountType {
  Fixed,
  Percent,
}

export class Line extends Base implements IKey {
  public id: number;
  public itemId: number;
  public quantity: number;
  public discountType: DiscountType;
  public discountAmount: number;
  public discountPercent: number;
  public price: number;

  public item?: Item;
}
