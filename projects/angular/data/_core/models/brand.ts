import { Base } from './base';
import { IImages } from './images';
import { IKey } from './key';
import { IMetadata } from './metadata';

export class Brand extends Base implements IKey, IImages, IMetadata {
  public id: number;
  public parentId?: number;
  public crmId?: number;
  public slug?: string;
  public name: string;
  public description?: string;
  public images?: string;
  public videos?: string;
  public folderName?: string;
  public url?: string;
  public authroizedDomains?: string;
  public notes?: string;
  public innovationGuide?: boolean;
  public focused?: boolean;
  public confirmed?: boolean;
  public innovationName?: string;
  public logoImage?: string;
  public primaryImage?: string;
  public exploreImage?: string;
  public exploreVideo?: string;
  public facebookUrl?: string;
  public twitterUrl?: string;
  public youTubeUrl?: string;
  public instagramUrl?: string;
  public linkedInUrl?: string;
  public averageSalePrice?: number;
  public purchasePredictionPercent?: number;
  public displayReturnOnInvestment: boolean;
  public redirectProductsScans?: boolean;

  public metaTitle: string;
  public metaDescription: string;
  public metaKeywords?: string;

  public users?: { userId: string; confirmed: boolean }[];
  public categories?: any[];
  public children?: Brand[];
}
