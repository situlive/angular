import { Brand } from './brand';
import { Conversion } from './conversion';
import { Inclusion } from './inclusion';
import { Rule } from './rule';
import { Transformation } from './transformation';
import { Base } from './base';
import { IKey } from './key';

export enum FeedType {
  Catalogue,
  Range,
  Specification,
}

export enum DataType {
  Json,
  Xml,
  Csv,
}

export class Feed extends Base implements IKey {
  id: number;
  categoryId: number;
  name: string;
  url: string;
  type: FeedType;
  dataType: DataType;
  active: boolean;

  brands: Brand[];
  conversions?: Conversion[];
  exclusions?: Inclusion[];
  inclusions?: Inclusion[];
  rules?: Rule[];
  transformations?: Transformation[];
  selected?: boolean;
}
