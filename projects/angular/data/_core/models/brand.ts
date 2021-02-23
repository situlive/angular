import { Base } from './base';
import { IKey } from './key';

export class Brand extends Base implements IKey {
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

  users?: { userId: string; confirmed: boolean }[];
}
