import { Base } from './base';
import { IImages } from './images';
import { IKey } from './key';

export class Venue extends Base implements IKey, IImages {
  id: number;
  name: string;
  slug: string;
  openingDate: string;
  description?: string;
  images?: string;
  folderName?: string;
  visionLocationId?: string;
}