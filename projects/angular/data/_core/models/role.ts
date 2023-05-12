import { IKey } from './key';
import { Claim } from './claim';
import { User } from './user';

export class Role implements IKey {
  public id: string;
  public name: string;

  public claims?: Claim[];
  public users?: User[];
}
