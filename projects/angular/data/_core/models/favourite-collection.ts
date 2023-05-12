import { Base } from './base';
import { IKey } from './key';
import { Favourite } from './favourite';

export class FavouriteCollection extends Base implements IKey {
  public id: number;
  public name: string;
  public slug: string;
  public public: boolean;

  public favourites: Favourite[];
}
