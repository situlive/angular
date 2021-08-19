import { BaseFeed } from './base-feed';
import { FilterOperator } from './filter-operator';

export enum MathOperator {
  Multiply,
  Divide,
  Add,
  Subtract,
}

export class Conversion extends BaseFeed {
  id: number;
  name: string;
  fieldName: string;
  filterOperator: FilterOperator;
  expression: string;
  mathOperator: MathOperator;
  value: number;
}
