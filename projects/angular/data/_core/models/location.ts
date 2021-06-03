import { DemoUnit } from './demo-unit';
import { Base } from './base';
import { IKey } from './key';

export class Location extends Base implements IKey {
  id: number;
  theatreId: number;
  zoneId?: number;
  name: string;
  targetUrl?: string;
  redirectUrl?: string;
  images?: string;

  x?: number;
  y?: number;
  width?: number;
  height?: number;
  planogram?: string;

  demoUnits: DemoUnit[];
  distance?: { x: number; y: number };
}
