import { Formula } from './formula';
import { AttributeMatch } from './attribute-match';
import { Orderable } from './orderable';

export class Attribute extends Orderable {
  id: number;
  criterionId: number;
  description: string;
  name: string;
  formulas?: Formula[];
  order?: number;
  match?: AttributeMatch;
  selected?: boolean;
  priority?: number;
}
