import { SpecificationData } from './specification-data';
import { Base } from './base';
import { IKey } from './key';
import { IImages } from './images';
import { ProductIdentifiers } from '.';

export class Product extends Base implements IKey, IImages {
  public id: string;
  public variant: string;
  public categorySlug: string;

  public title: string;
  public brand: string;
  public brandId: number;
  public colour: string;
  public summary?: string;
  public description?: string;
  public imageUrl?: string;
  public modelGroup?: string;
  public modelAlias?: string;
  public modelSubGroup?: string;
  public rrp?: number;

  public scenarios?: string[];

  public state:
    | 'Unverified'
    | 'Pending'
    | 'Verified'
    | 'Live'
    | 'Excluded'
    | 'Offline';

  public hasSpecification?: boolean;
  public specificationData?: SpecificationData;
  public specificationFeedId?: number;

  public hasContextData?: boolean;
  public contextData?: any;

  public images?: string[];
  public primaryImage?: string;
  public exploreImage?: string;
  public videos?: string[];
  public exploreVideo?: string;
  public folderName?: string;
  public retailers?: any[];

  public selected?: boolean;
  public withheld?: boolean;

  public identifiers: ProductIdentifiers;
}
