import { BaseFeed } from './base-feed';
import { FilterOperator } from './filter-operator';

export class Inclusion extends BaseFeed {
  id: number;
  name: string;
  fieldName: string;
  filterOperator: FilterOperator;
  expression: string;
}
