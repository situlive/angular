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
  Connector,
}

export enum DataType {
  Json,
  Xml,
  Csv,
}

export enum FeedFrequency {
  Unknown,
  Manual,
  Minutes,
  Days,
}

export enum FeedConnector {
  Squirrel,
}

export class Feed extends Base implements IKey {
  public id: number;
  public categoryId: number;
  public name: string;
  public url: string;
  public type: FeedType;
  public dataType: DataType;
  public active: boolean;
  public frequency: FeedFrequency;
  public interval?: number;
  public startTime?: string;
  public lastRunTime?: string;
  public token?: string;
  public connector?: FeedConnector;

  public brands: Brand[];
  public conversions?: Conversion[];
  public exclusions?: Inclusion[];
  public inclusions?: Inclusion[];
  public rules?: Rule[];
  public transformations?: Transformation[];
  public selected?: boolean;
}
