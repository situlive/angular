import { BaseModel } from './base-model';

export class Claim implements BaseModel {
    id: number;
    value: string;
    description?: string;
}
