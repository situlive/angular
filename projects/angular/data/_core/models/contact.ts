import { BaseModel } from './base-model';

export enum ContactType {
  FounderOrEmployee,
  CustomerOrSupporter,
  Other,
}

export class Contact implements BaseModel {
  id: number;
  brandId: number;
  firstName: string;
  lastName: string;
  email: string;
  type: ContactType;
}
