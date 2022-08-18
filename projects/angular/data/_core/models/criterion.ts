import { Attribute } from './attribute';
import { ProductMatch } from './product-match';
import { Orderable } from './orderable';

export class Criterion extends Orderable {
  categoryId: number;
  description: string;
  comparable: boolean;
  highlight: boolean;
  id: number;
  name: string;
  attributes?: Attribute[];
  match?: ProductMatch;
  selected?: boolean;
  isRecommendationQuestion?: boolean;
  recommendationTitle?: string;
  priority?: number;
}
