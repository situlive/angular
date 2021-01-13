import { Brand } from './brand';
import { Category } from './category';
import { Plan } from './plan';
import { Theatre } from './theatre';

export class User {
    id: string;
    userName: string;
    firstName: string;
    lastName: string;
    confirmed: boolean;

    brands?: Brand[];
    categories?: Category[];
    plans?: Plan[];
    theatres?: Theatre[];
}
