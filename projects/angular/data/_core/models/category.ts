import { Base } from './base';
import { IKey } from './key';
import { Brand } from './brand';

export class Category extends Base implements IKey {
  id: number;
  name: string;
  slug?: string;
  images?: string;
  active: boolean;

  brands?: Brand[];
}
