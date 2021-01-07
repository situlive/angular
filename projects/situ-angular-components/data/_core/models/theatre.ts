import { BaseModel } from './base-model';

export class Theatre implements BaseModel {
  id: number;
  venueId: number;
  name: string;
  description?: string;
}
