import { BaseModel } from './base-model';
import { Category } from './category';

export class Group implements BaseModel {
    id: number;
    name: string;

    categories?: Category[];
}