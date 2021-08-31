import { Orderable } from './orderable';

export class Formula extends Orderable {
  attributeId?: number;
  scenarioId?: number;
  expression: string;
  fieldName: string;
  id: number;
  filterOperator: number;
}
