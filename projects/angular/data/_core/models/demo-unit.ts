export enum DemoUnitState {
  Pending,
  Active,
  Returned,
}

export class DemoUnit {
  public id: number;
  public subscriptionId: number;
  public returnAddressId?: number;
  public locationId?: number;
  public gtin?: string;
  public referenceNumber?: string;
  public serialNumber?: string;
  public images?: string;
  public state: DemoUnitState;
  public expired?: string;
  public notes?: string;
}
