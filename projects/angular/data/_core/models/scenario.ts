import { Formula } from './formula';
import { Orderable } from './orderable';

export class Scenario extends Orderable {
  public categoryId: number;
  public order: number;
  public name: string;
  public description?: string;

  public formulas: Formula[];
}
