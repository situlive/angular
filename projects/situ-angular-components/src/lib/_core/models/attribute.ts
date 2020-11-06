import { Formula } from './formula';
import { AttributeMatch } from './attribute-match';

export class Attribute {
    criterionId: number;
    description: string;
    id: number;
    name: string;
    formulas?: Formula[];
    order?: number;
    match?: AttributeMatch;
    selected?: boolean;
}
