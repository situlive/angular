import { BaseModel } from './base-model';

export class Category implements BaseModel {
    id: string;
    name: string;
    image: string;
    active: boolean;
}
