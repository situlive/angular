import { Base } from './base';
import { IKey } from './key';

export class Zone extends Base implements IKey {
  id: number;
  venueId: number;
  name: string;
  images?: string;
}
