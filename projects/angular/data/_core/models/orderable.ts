import { Base } from './base';
import { IKey } from './key';

export class Orderable extends Base implements IKey {
  public id: number | string;
  public order?: number;
}
