import { Field } from './field';
import { Orderable } from './orderable';

export class Mapping extends Orderable {
  public declare id: number;
  public feedId: number;
  public fieldId: number;
  public path: string;
  public field?: Field;
}
