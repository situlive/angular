import { Base } from './base';
import { IKey } from './key';
import { Category } from './category';

export class Group extends Base implements IKey {
  id: number;
  name: string;
  images?: string;

  categories?: Category[];
}
