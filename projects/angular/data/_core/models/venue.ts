import { Base } from './base';
import { IKey } from './key';

export class Venue extends Base implements IKey {
  id: number;
  name: string;
  description?: string;
  images?: string;
}
