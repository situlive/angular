import { Base } from './base';
import { IKey } from './key';

export class Claim extends Base implements IKey {
  public id: number;
  public value: string;
  public description?: string;
}
