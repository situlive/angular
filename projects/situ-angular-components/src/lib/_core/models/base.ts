import { BaseModel } from './base-model';

export class Base implements BaseModel {
    id: number | string;
    order?: number;
}
