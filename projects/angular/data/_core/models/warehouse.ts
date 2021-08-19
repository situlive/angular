import { Base } from './base';
import { IKey } from './key';

export class Warehouse extends Base implements IKey {
  id: number;
  venueId: number;
  name: string;
}
