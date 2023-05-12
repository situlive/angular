import { Base } from './base';
import { IKey } from './key';
import { Category } from './category';
import { IImages } from './images';

export class Group extends Base implements IKey, IImages {
  public id: number;
  public name: string;
  public images?: string;
  public folderName?: string;

  public categories?: Category[];
}
