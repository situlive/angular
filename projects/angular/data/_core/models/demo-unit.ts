import { Brand } from './brand';
import { Theatre } from './theatre';

export enum DemoUnitState {
  Pending,
  Active,
  Returned,
}

export enum DisplayMethod {
  WallMounted,
  Integrated,
  Shelf,
  Plinth,
  Floor,
}

export enum NetworkRequirement {
  Ethernet,
  Wifi,
  Both,
  None,
}

export enum PowerRequirement {
  AlwaysOn,
  Charge,
  None,
}

export enum ProductLongevity {
  OneMonth,
  ThreeMonths,
  TwelveMonths,
}

export class DemoUnit {
  public id: number;
  public brandId: number;
  public itemId: number;
  public subscriptionId: number;
  public theatreId: number;
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

  public depth: number;
  public height: number;
  public weight: number;
  public width: number;

  public accessories: string;
  public batteryLife: string;
  public demo: string;
  public displayMethod: DisplayMethod;
  public estimatedProductLongevity: ProductLongevity;
  public expectedDeliveryDate: string;
  public homeConnected: string;
  public lighting: boolean;
  public monitor: boolean;
  public networkRequirement: NetworkRequirement;
  public powerRequirement: PowerRequirement;
  public productUrl: string;
  public shelf: string;
  public spare: boolean;
  public specializedInstallation: boolean;
  public water: boolean;

  public brand?: Brand;
  public theatre?: Theatre;
}
