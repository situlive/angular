import { BaseModel } from './base-model';
import { Claim } from './claim';
import { User } from './user';

export class Role implements BaseModel {
    id: string;
    name: string;

    claims?: Claim[];
    users?: User[];
}
