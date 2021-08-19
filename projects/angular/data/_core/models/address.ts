import { Base } from './base';
import { IKey } from './key';

export class Address extends Base implements IKey {
  public id: number;
  public brandId: number;
  public line1: string;
  public line2: string;
  public line3: string;
  public city: string;
  public stateOrProvince: string;
  public county: string;
  public country: string;
  public postCode: string;
}
