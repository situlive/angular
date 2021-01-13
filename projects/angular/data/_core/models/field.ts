import { BaseModel } from './base-model';

export class Field implements BaseModel {
    id: number;
    categoryId: string;
    name: string;
    dataType: number;
    isSpecification: boolean;
    display: boolean;
    required: boolean;
    canCopy: boolean;
    order?: number;
}
