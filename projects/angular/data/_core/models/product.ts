import { SpecificationData } from './specification-data';
import { BaseModel } from './base-model';

export class Product implements BaseModel {
  id: string;
  variant: string;
  title: string;
  categoryId: number;
  state: 'Complete' | 'Incomplete' | 'Live' | 'NewEntry';
  specification: SpecificationData;
  images: string[];
  selected?: boolean;
}
