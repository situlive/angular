import { Brand } from './brand';
import { Conversion } from './conversion';
import { Inclusion } from './inclusion';
import { Rule } from './rule';
import { Transformation } from './transformation';
import { BaseModel } from './base-model';

export class Feed implements BaseModel {
  id: number;
  categoryId: number;
  name: string;
  url: string;
  type: number;
  active: boolean;

  brands: Brand[];
  conversions?: Conversion[];
  exclusions?: Inclusion[];
  inclusions?: Inclusion[];
  rules?: Rule[];
  transformations?: Transformation[];
  selected?: boolean;
}
