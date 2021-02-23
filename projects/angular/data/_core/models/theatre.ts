import { Base } from './base';
import { IKey } from './key';

export class Theatre extends Base implements IKey {
  id: number;
  venueId: number;
  name: string;
  description?: string;
  images?: string;
}
