import { Base } from './base';
import { IKey } from './key';
import { Theatre } from '.';

export class Zone extends Base implements IKey {
  public id: number;
  public venueId: number;
  public name: string;
  public images?: string;
  public theatreId?: number;
  public wholeTheatre?: boolean;

  public theatre: Theatre;
}
