import { Base } from './base';
import { IImages } from './images';
import { IKey } from './key';

export class Venue extends Base implements IKey, IImages {
  public id: number;
  public name: string;
  public slug: string;
  public openingDate: string;
  public description?: string;
  public images?: string;
  public folderName?: string;
  public visionLocationId?: string;
}
