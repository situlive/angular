import { Base } from './base';
import { IKey } from './key';

export class Item extends Base implements IKey {
  id: number;
  name: string;
  description: string;
  price: number;
}
