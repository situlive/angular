import { Orderable } from './orderable';

export class Formula extends Orderable {
  answerId?: number;
  attributeId?: number;
  scenarioId?: number;
  expression: string;
  fieldName: string;
  id: number;
  filterOperator: number;
  target: string;
}
