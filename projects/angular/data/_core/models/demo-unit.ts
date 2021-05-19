import { Brand } from './brand';

export enum DemoUnitState {
  Pending,
  Active,
  Returned,
}

export class DemoUnit {
  public id: number;
  public brandId: number;
  public itemId: number;
  public subscriptionId: number;
  public addressId?: number;
  public images?: string;
  public locationId?: number;
  public productId: string;
  public productName: string;
  public referenceNumber: string;
  public serialNumber: string;
  public state: DemoUnitState;
  public startDate?: string;
  public endDate?: string;
  public notes?: string;
  public returned: boolean;

  public brand?: Brand;
}
