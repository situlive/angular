import { Field } from './field';
import { Orderable } from './orderable';

export class Mapping extends Orderable {
  id: number;
  feedId: number;
  fieldId: number;
  path: string;
  field?: Field;
}
