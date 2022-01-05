import { SpecificationData } from './specification-data';
import { Base } from './base';
import { IKey } from './key';
import { IImages } from './images';

export class Product extends Base implements IKey, IImages {
  id: string;
  variant: string;
  categorySlug: string;

  title: string;
  brand: string;
  brandId: number;
  colour: string;
  summary?: string;
  description?: string;
  imageUrl?: string;
  modelGroup?: string;
  modelAlias?: string;
  modelSubGroup?: string;

  scenarios?: string[];

  state:
    | 'Unverified'
    | 'Pending'
    | 'Verified'
    | 'Live'
    | 'Excluded'
    | 'Offline';

  hasSpecification?: boolean;
  specificationData?: SpecificationData;
  specificationFeedId?: number;

  hasContextData?: boolean;
  contextData?: any;

  images?: string[];
  exploreImage?: string;
  videos?: string[];
  exploreVideo?: string;
  folderName?: string;
  retailers?: any[];

  selected?: boolean;
}