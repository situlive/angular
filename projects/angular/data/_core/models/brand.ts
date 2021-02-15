import { BaseModel } from './base-model';

export class Brand implements BaseModel {
  id: number;
  parentId?: number;
  crmId?: number;
  slug?: string;
  name: string;
  description?: string;
  images?: string;
  url?: string;
  authroizedDomains?: string;
  notes?: string;
  qualityCheckPassed?: boolean;
  commercialCheckPassed?: boolean;
  confirmed?: boolean;
}
