import { BaseFeed } from './base-feed';

export class Transformation extends BaseFeed {
    id: number;
    name: string;
    fieldName: string;
    filterOperator: number;
    expression: string;
    transformationOperator: number;
    match: string;
    replacement: string;
}
