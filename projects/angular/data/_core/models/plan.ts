import { Base } from './base';
import { IKey } from './key';
import { PlanLine } from './plan-line';

export class Plan extends Base implements IKey {
  id: number;
  name: string;
  description?: string;
  price: number;
  units: number;

  theatres?: any[];
  lines?: PlanLine[];
}
