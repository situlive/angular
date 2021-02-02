import { Attribute } from './attribute';
import { CriteriaMatch } from './criteria-match';
import { BaseModel } from './base-model';

export class Criterion implements BaseModel {
  categoryId: number;
  description: string;
  highlight: boolean;
  id: number;
  name: string;
  order?: number;
  attributes?: Attribute[];
  match?: CriteriaMatch;
  selected?: boolean;
}
