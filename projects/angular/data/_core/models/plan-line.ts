import { Item } from './item';
import { Line } from './line';

export class PlanLine extends Line {
  public planId: number;

  public declare item: Item;
}
