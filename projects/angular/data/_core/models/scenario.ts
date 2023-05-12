import { ProductMatch } from './product-match';
import { Formula } from './formula';
import { Orderable } from './orderable';
import { IImages } from './images';
import { IKey } from './key';

export class Scenario extends Orderable implements IKey, IImages {
  id: number;
  categoryId: number;
  order: number;
  name: string;
  description?: string;
  images?: string;
  folderName?: string;
  match?: ProductMatch;

  formulas: Formula[];
}
