import { Formula } from './formula';

export class RecommendationAnswer {
  public id: number;
  public recommendationQuestionId: number;
  public title: string;
  public priority: number;
  public order: number;

  public formulas: Formula[];
}
