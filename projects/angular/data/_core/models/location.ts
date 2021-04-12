import { Base } from './base';
import { IKey } from './key';

export class Location extends Base implements IKey {
  id: number;
  theatreId: number;
  name: string;
  url?: string;
  images?: string;
}
