import { BaseFeed } from './base-feed';
import { FilterOperator } from './filter-operator';

export class Inclusion extends BaseFeed {
  public declare id: number;
  public name: string;
  public fieldName: string;
  public filterOperator: FilterOperator;
  public expression: string;
}
