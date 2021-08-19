import { Base } from './base';
import { IKey } from './key';

export class Changeover extends Base implements IKey {
  public id: number;
  public venueId: number;
  public date: string;
}
