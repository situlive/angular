import { BaseModel } from './base-model';

export class Venue implements BaseModel {
  id: number;
  name: string;
  description?: string;
  images?: string;
}
