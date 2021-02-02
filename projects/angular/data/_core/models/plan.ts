import { BaseModel } from './base-model';

export class Plan implements BaseModel {
  id: number;
  price: number;
  productCount: number;
  name: string;
  description?: string;

  theatres?: any[];
}
