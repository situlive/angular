import { Base } from './base';
import { IKey } from './key';
import { Category } from './category';
import { IImages } from './images';

export class Group extends Base implements IKey, IImages {
  id: number;
  name: string;
  images?: string;
  folderName?: string;

  categories?: Category[];
}