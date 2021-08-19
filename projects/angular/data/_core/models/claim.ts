import { Base } from './base';
import { IKey } from './key';

export class Claim extends Base implements IKey {
  id: number;
  value: string;
  description?: string;
}
