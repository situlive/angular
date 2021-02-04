import { BaseModel } from './base-model';

export class Brand implements BaseModel {
  id: number;
  name: string;
  description?: string;
  slug?: string;
  domains?: string;
  images?: string;
  qualityCheckPassed?: boolean;
  commercialCheckPassed?: boolean;
  notes?: string;
}
