import { DemoUnit } from './demo-unit';
import { Base } from './base';
import { IKey } from './key';
import { IImages } from './images';

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

  demoUnits: DemoUnit[];
  distance?: { x: number; y: number };
}