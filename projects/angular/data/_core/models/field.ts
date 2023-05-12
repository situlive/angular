import { Base } from './base';
import { IKey } from './key';
export enum FieldDataType {
  Text,
  Integer,
  BigInteger,
  Double,
  Boolean,
}

export class Field extends Base implements IKey {
  public id: number;
  public categoryId: number;
  public name: string;
  public displayTitle: string;
  public dataType: FieldDataType;
  public isSpecification: boolean;
  public display: boolean;
  public required: boolean;
  public mapped: boolean;
  public canCopy: boolean;
  public order?: number;
}
