import { ProductMatch } from './product-match';
import { Formula } from './formula';
import { Orderable } from './orderable';
import { IImages } from './images';
import { IKey } from './key';

export class Scenario extends Orderable implements IKey, IImages {
  public declare id: number;
  public categoryId: number;
  public declare order: number;
  public name: string;
  public description?: string;
  public images?: string;
  public folderName?: string;
  public match?: ProductMatch;

  public formulas: Formula[];
}
