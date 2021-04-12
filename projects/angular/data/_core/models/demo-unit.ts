export enum DemoUnitState {
  Pending,
  Active,
  Returned,
}

export class DemoUnit {
  public id: number;
  public brandId: number;
  public venueId: number;
  public subscriptionId?: number;
  public returnAddressId?: number;
  public locationId?: number;
  public productName: string;
  public gtin: string;
  public referenceNumber?: string;
  public serialNumber?: string;
  public state: DemoUnitState;
  public started: string;
  public expired?: string;
  public notes?: string;
}
