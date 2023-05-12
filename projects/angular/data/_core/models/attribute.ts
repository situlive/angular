import { Formula } from './formula';
import { AttributeMatch } from './attribute-match';
import { Orderable } from './orderable';

export class Attribute extends Orderable {
  public declare id: number;
  public criterionId: number;
  public description: string;
  public name: string;
  public formulas?: Formula[];
  public match?: AttributeMatch;
  public selected?: boolean;
  public priority?: number;
}
