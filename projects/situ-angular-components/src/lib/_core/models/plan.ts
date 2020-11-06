import { BaseModel } from './base-model';

export class Plan implements BaseModel {
    id: number;
    name: string;
    description?: string;
    quantity?: number;
    booked?: number;
    available?: number;

    theatres?: any[];
}
