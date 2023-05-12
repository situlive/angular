import { Base } from './base';
import { IKey } from './key';
export enum ContactType {
  FounderOrEmployee,
  CustomerOrSupporter,
  Other,
}

export class Contact extends Base implements IKey {
  public id: number;
  public brandId: number;
  public firstName: string;
  public lastName: string;
  public email: string;
  public type: ContactType;
}
