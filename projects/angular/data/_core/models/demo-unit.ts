import {
  Address,
  Brand,
  DemoUnitState,
  Item,
  Location,
  Subscription,
  Theatre,
  Warehouse,
} from '.';

import { Base } from './base';
import { IKey } from './key';

export class DemoUnit extends Base implements IKey {
  public id: number;
  public brandId: number;
  public subscriptionId: number;
  public itemId: number;

  public addressId?: number;
  public locationId?: number;
  public warehouseId?: number;

  public accessories: string;
  public demo: string;
  public descriptor: string;
  public merchandiseName: string;
  public productId: string;
  public productName: string;
  public productUrl: string;
  public referenceNumber: string;
  public serialNumber: string;
  public spare: boolean;

  public returned: boolean;
  public startDate?: string;
  public endDate?: string;
  public state?: DemoUnitState;

  public brand?: Brand;
  public item?: Item;
  public location?: Location;
  public returnAddress?: Address;
  public subscription?: Subscription;
  public theatre?: Theatre;
  public warehouse?: Warehouse;
}
