import { Base } from './base';
import { IKey } from './key';
import { Brand } from './brand';
import { IImages } from './images';

export class Category extends Base implements IKey, IImages {
  id: number;
  name: string;
  description?: string;
  slug?: string;
  images?: string;
  folderName?: string;
  active: boolean;

  brands?: Brand[];
}