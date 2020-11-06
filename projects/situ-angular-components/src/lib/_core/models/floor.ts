import { BaseModel } from './base-model';

export class Floor implements BaseModel {
    id: number;
    venueId: number;
    name: string;
}
