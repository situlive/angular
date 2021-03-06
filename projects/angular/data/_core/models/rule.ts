import { BaseFeed } from './base-feed';

export class Rule extends BaseFeed {
    id: number;
    name: string;
    fieldName: string;
    filterOperator: number;
    expression: string;
}
