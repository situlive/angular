import { BaseFeed } from './base-feed';
import { FilterOperator } from './filter-operator';

export enum MathOperator {
  Multiply,
  Divide,
  Add,
  Subtract,
}

export class Conversion extends BaseFeed {
  public declare id: number;
  public name: string;
  public fieldName: string;
  public filterOperator: FilterOperator;
  public expression: string;
  public mathOperator: MathOperator;
  public value: number;
}
