import { SpecificationData } from './specification-data';
import { Base } from './base';
import { IKey } from './key';

export class Product extends Base implements IKey {
  id: string;
  variant: string;
  categoryId: string;

  title: string;
  brand: string;
  colour: string;
  summary?: string;
  description?: string;
  imageUrl?: string;
  modelGroup?: string;
  modelAlias?: string;
  modelSubGroup?: string;

  scenarios?: string[];

  state: 'Complete' | 'Incomplete' | 'Live' | 'NewEntry';

  hasSpecification?: boolean;
  specification?: SpecificationData;
  specificationFeedId?: number;

  hasContextualData?: boolean;
  contextData?: any;
  contextualizationCreated?: string;
  contextualizationUpdated?: string;

  images?: string[];
  retailers?: any[];
  retailersUpdated?: string;
  priceDropPercentage?: number;

  selected?: boolean;
}
