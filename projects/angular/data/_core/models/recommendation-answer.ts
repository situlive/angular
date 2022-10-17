import { Formula } from './formula';
import { Orderable } from './orderable';

export class RecommendationAnswer extends Orderable {
  public id: number;
  public recommendationQuestionId: number;
  public title: string;
  public priority: number;

  public formulas: Formula[];
}
