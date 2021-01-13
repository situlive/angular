import { BaseFeed } from './base-feed';

export class Conversion extends BaseFeed {
    id: number;
    name: string;
    fieldName: string;
    filterOperator: number;
    expression: string;
    mathOperator: number;
    value: number;
}
