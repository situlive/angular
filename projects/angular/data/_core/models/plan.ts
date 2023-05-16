import { Base } from './base';
import { IKey } from './key';
import { PlanLine } from './plan-line';

export class Plan extends Base implements IKey {
  public id: number;
  public name: string;
  public description?: string;
  public promoted: boolean;
  public price: number;
  public units: number;

  public theatres?: any[];
  public lines?: PlanLine[];
}
