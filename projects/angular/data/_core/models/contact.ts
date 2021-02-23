import { Base } from './base';
import { IKey } from './key';
export enum ContactType {
  FounderOrEmployee,
  CustomerOrSupporter,
  Other,
}

export class Contact extends Base implements IKey {
  id: number;
  brandId: number;
  firstName: string;
  lastName: string;
  email: string;
  type: ContactType;
}
