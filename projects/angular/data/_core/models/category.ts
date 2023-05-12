import { Base } from './base';
import { IKey } from './key';
import { Brand } from './brand';
import { IImages } from './images';
import { IMetadata } from './metadata';

export class Category extends Base implements IKey, IImages, IMetadata {
  public id: number;
  public name: string;
  public singularName?: string;
  public pluralName?: string;
  public description?: string;
  public slug?: string;
  public images?: string;
  public folderName?: string;
  public active: boolean;
  public contextDataActive: boolean;
  public recommendationActive: boolean;

  public metaTitle: string;
  public metaDescription: string;
  public metaKeywords?: string;

  public brands?: Brand[];
}
