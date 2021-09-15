import { Base } from './base';
import { IImages } from './images';
import { IKey } from './key';

export class Theatre extends Base implements IKey, IImages {
  id: number;
  venueId: number;
  name: string;
  description?: string;
  images?: string;
  folderName?: string;
}