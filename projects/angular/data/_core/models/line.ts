import { Base } from './base';
import { Item } from './item';
import { IKey } from './key';

export class Line extends Base implements IKey {
  id: number;
  itemId: number;
  quantity: number;
  discountAmount: number;
  discountPercent: number;

  item: Item;
}
