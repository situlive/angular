import { SpecificationData } from './specification-data';
import { BaseModel } from './base-model';

export class Product implements BaseModel {
    id: string;
    variant: string;
    categoryId: string;
    state: 'Complete' | 'Incomplete' | 'Live' | 'NewEntry';
    specification: SpecificationData;
    images: string[];
    selected?: boolean;
}
