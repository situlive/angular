import { Attribute } from './attribute';
import { CriteriaMatch } from './criteria-match';
import { Orderable } from './orderable';

export class Criterion extends Orderable {
  categoryId: number;
  description: string;
  highlight: boolean;
  id: number;
  name: string;
  attributes?: Attribute[];
  match?: CriteriaMatch;
  selected?: boolean;
}
