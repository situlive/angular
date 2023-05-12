import { Base } from './base';
import { IKey } from './key';
import { Theatre } from '.';

export class Zone extends Base implements IKey {
  id: number;
  venueId: number;
  name: string;
  images?: string;
  theatreId?: number;
  wholeTheatre?: boolean;
  
  theatre: Theatre;
}