import { Base } from './base';
import { IImages } from './images';
import { IKey } from './key';
import { IMetadata } from './metadata';

export class Brand extends Base implements IKey, IImages, IMetadata {
  id: number;
  parentId?: number;
  crmId?: number;
  slug?: string;
  name: string;
  description?: string;
  images?: string;
  folderName?: string;
  url?: string;
  authroizedDomains?: string;
  notes?: string;
  innovationGuide?: boolean;
  commercialCheckPassed?: boolean;
  confirmed?: boolean;
  innovationName?: string;
  logoImage?: string;
  primaryImage?: string;
  exploreImage?: string;
  exploreVideo?: string;
  facebookUrl?: string;
  twitterUrl?: string;
  youTubeUrl?: string;
  instagramUrl?: string;
  linkedInUrl?: string;
  averageSalePrice?: number;
  purchasePredictionPercent?: number;
  displayReturnOnInvestment: boolean;
  redirectProductsScans?: boolean;

  metaTitle: string;
  metaDescription: string;
  metaKeywords?: string;

  users?: { userId: string; confirmed: boolean }[];
  categories?: any[];
  children?: Brand[];
}