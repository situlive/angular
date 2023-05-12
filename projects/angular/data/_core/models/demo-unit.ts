import {
  Address,
  Brand,
  DemoUnitLocation,
  Item,
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
  public portableApplianceTestingNotes: string;
  public spare: boolean;

  public brand?: Brand;
  public item?: Item;
  public returnAddress?: Address;
  public subscription?: Subscription;
  public theatre?: Theatre;
  public warehouse?: Warehouse;
  public demoUnitLocations?: DemoUnitLocation[];
}