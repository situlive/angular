import { Base } from './base';
import { IKey } from './key';

export class Item extends Base implements IKey {
  public id: number;
  public name: string;
  public description: string;
  public price: number;
}
