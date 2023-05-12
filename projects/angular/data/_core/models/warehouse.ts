import { Base } from './base';
import { IKey } from './key';

export class Warehouse extends Base implements IKey {
  public id: number;
  public venueId: number;
  public name: string;
}
