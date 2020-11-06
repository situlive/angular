import { BaseModel } from './base-model';

export class Theatre implements BaseModel {
    id: number;
    floorId: number;
    name: string;
    description?: string;
}
