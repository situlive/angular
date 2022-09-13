import { Base } from './base';
import { IKey } from './key';
import { Brand } from './brand';
import { IImages } from './images';
import { IMetadata } from './metadata';

export class Category extends Base implements IKey, IImages, IMetadata {
  id: number;
  name: string;
  description?: string;
  slug?: string;
  images?: string;
  folderName?: string;
  active: boolean;
  contextDataActive: boolean;
  recommendationActive: boolean;

  metaTitle: string;
  metaDescription: string;
  metaKeywords?: string;

  brands?: Brand[];
}