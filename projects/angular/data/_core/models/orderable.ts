import { Base } from './base';
import { IKey } from './key';

export class Orderable extends Base implements IKey {
  id: number | string;
  order?: number;
}
