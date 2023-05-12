import { Base } from './base';
import { IKey } from './key';

export enum FavouriteType {
  Product,
  Brand,
  Cms,
}

export class Favourite extends Base implements IKey {
  public id: number;
  public favouriteCollectionId: number;
  public url: string;
  public type: FavouriteType;
}
