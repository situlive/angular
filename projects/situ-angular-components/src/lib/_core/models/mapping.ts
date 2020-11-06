import { Field } from './field';
import { BaseFeed } from './base-feed';

export class Mapping extends BaseFeed {
    id: number;
    fieldId: number;
    path: string;
    field?: Field;
}
