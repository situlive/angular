import { Base } from './base';
import { IKey } from './key';

export class Plan extends Base implements IKey {
  id: number;
  price: number;
  productCount: number;
  name: string;
  description?: string;

  theatres?: any[];
}
