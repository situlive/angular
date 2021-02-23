import { IKey } from './key';
import { Claim } from './claim';
import { User } from './user';

export class Role implements IKey {
  id: string;
  name: string;

  claims?: Claim[];
  users?: User[];
}
