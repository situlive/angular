import { BaseModel } from './base-model';

export class Location implements BaseModel {
  id: number;
  theatreId: number;
  name: string;
  images?: string;
}
