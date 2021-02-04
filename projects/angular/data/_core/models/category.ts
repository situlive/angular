import { BaseModel } from './base-model';
import { Brand } from './brand';

export class Category implements BaseModel {
  id: number;
  name: string;
  images?: string;
  active: boolean;

  brands?: Brand[];
}
