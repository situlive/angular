import { Orderable } from './orderable';

export class Formula extends Orderable {
  public answerId?: number;
  public attributeId?: number;
  public scenarioId?: number;
  public expression: string;
  public fieldName: string;
  public declare id: number;
  public filterOperator: number;
  public target: string;
}
