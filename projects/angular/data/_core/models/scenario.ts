import { ProductMatch } from './product-match';
import { Formula } from './formula';
import { Orderable } from './orderable';

export class Scenario extends Orderable {
  id: number;
  categoryId: number;
  order: number;
  name: string;
  description?: string;
  images?: string;
  match?: ProductMatch;

  formulas: Formula[];
}
