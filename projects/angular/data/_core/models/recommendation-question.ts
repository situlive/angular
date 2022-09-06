import { RecommendationAnswer } from './recommendation-answer';

export enum RecommendationQuestionStep {
  Scenario,
  Question,
}

export class RecommendationQuestion {
  public id: number;
  public categoryId: number;
  public title: string;
  public shortTitle?: string;
  public priority: number;
  public order: number;
  public step: RecommendationQuestionStep;

  public recommendationAnswers: RecommendationAnswer[];
}
