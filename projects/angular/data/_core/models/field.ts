import { BaseModel } from './base-model';
export enum FieldDataType {
  Text,
  Integer,
  BigInteger,
  Double,
  Boolean,
}

export class Field implements BaseModel {
  id: number;
  categoryId: number;
  name: string;
  dataType: FieldDataType;
  isSpecification: boolean;
  display: boolean;
  required: boolean;
  canCopy: boolean;
  order?: number;
}
