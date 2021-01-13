import { BaseModel } from './base-model';

export class Brand implements BaseModel {
    id: number;
    name: string;
    domains: string;
    qualityCheckPassed: boolean;
    commercialCheckPassed: boolean;
    notes: string;
}
