import { BaseFeed } from './base-feed';

export class Rule extends BaseFeed {
  public declare id: number;
  public name: string;
  public fieldName: string;
  public filterOperator: number;
  public expression: string;
}
