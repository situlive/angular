import { Base } from './base';
import { IKey } from './key';

export enum FavouriteType {
  Product,
  Brand,
  Cms,
}

export class Favourite extends Base implements IKey {
  id: number;
  favouriteCollectionId: number;
  url: string;
  type: FavouriteType;
}
