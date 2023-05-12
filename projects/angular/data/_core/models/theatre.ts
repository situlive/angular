import { Base } from './base';
import { IImages } from './images';
import { IKey } from './key';

export enum TheatreType {
  None,
  HotSwap,
}

export class Theatre extends Base implements IKey, IImages {
  public id: number;
  public venueId: number;
  public name: string;
  public description?: string;
  public images?: string;
  public folderName?: string;
  public visionAreaId?: string;
  public parentTheatreId?: number;
  public type: TheatreType;

  public parentTheatre: Theatre;
}
