import { BaseModel } from './base-model';

export class Contact implements BaseModel {
  id: number;
  brandId: number;
  firstName: string;
  lastName: string;
  email: string;
  type: number;
}
