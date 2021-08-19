import { Base } from './base';
import { IKey } from './key';
import { Favourite } from './favourite';

export class FavouriteCollection extends Base implements IKey {
  id: number;
  name: string;
  slug: string;
  public: boolean;

  favourites: Favourite[];
}
