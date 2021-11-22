import { Base } from './base';
import { IKey } from './key';
import { IImages } from './images';
import { DemoUnitLocation, Theatre } from '.';

export class Location extends Base implements IKey, IImages {
  id: number;
  theatreId: number;
  zoneId?: number;
  name: string;
  targetUrl?: string;
  redirectUrl?: string;
  images?: string;
  folderName?: string;
  qrCode: string;

  x?: number;
  y?: number;
  width?: number;
  height?: number;
  planogram?: string;

  demoUnitLocations: DemoUnitLocation[];
  theatre: Theatre;
  distance?: { x: number; y: number };
}
