import { Attribute } from './attribute';
import { ProductMatch } from './product-match';
import { Orderable } from './orderable';

export class Criterion extends Orderable {
  public categoryId: number;
  public description: string;
  public comparable: boolean;
  public highlight: boolean;
  public declare id: number;
  public name: string;
  public attributes?: Attribute[];
  public match?: ProductMatch;
  public selected?: boolean;
  public isRecommendationQuestion?: boolean;
  public recommendationTitle?: string;
  public priority?: number;
}
