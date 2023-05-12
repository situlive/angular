import { Base } from './base';
import { IKey } from './key';
import { IImages } from './images';
import { DemoUnitLocation, Theatre } from '.';

export class Location extends Base implements IKey, IImages {
  public id: number;
  public theatreId: number;
  public zoneId?: number;
  public name: string;
  public targetUrl?: string;
  public redirectUrl?: string;
  public images?: string;
  public folderName?: string;
  public qrCode: string;
  public exploreQrCodeImage?: string;

  public x?: number;
  public y?: number;
  public width?: number;
  public height?: number;
  public planogram?: string;

  public demoUnitLocations: DemoUnitLocation[];
  public theatre: Theatre;
  public distance?: { x: number; y: number };
}
