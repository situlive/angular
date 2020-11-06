import { BaseModel } from './base-model';

export class Formula implements BaseModel {
    attributeId: number;
    expression: string;
    fieldName: string;
    id: number;
    filterOperator: number;
    order?: number;
}
