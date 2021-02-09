import { BaseFeed } from './base-feed';
import { FilterOperator } from './filter-operator';

export enum TransformationOperator {
  String,
  RegularExpression,
}

export class Transformation extends BaseFeed {
  id: number;
  name: string;
  fieldName: string;
  filterOperator: FilterOperator;
  expression: string;
  transformationOperator: TransformationOperator;
  match: string;
  replacement: string;
}
