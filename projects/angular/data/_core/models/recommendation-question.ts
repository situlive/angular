import { Orderable } from './orderable';
import { RecommendationAnswer } from './recommendation-answer';

export enum RecommendationQuestionStep {
  Scenario,
  Question,
}

export class RecommendationQuestion extends Orderable {
  public id: number;
  public categoryId: number;
  public title: string;
  public shortTitle?: string;
  public priority: number;
  public step: RecommendationQuestionStep;

  public recommendationAnswers: RecommendationAnswer[];
}
