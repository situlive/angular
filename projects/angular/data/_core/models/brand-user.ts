import { Brand } from './brand';

export class BrandUser {
  public id?: number;
  public brandId: number;
  public userId: string;
  public confirmed: boolean;
  public domain?: string;
  public image?: string;
  public jobTitle?: string;
  public firstName?: string;
  public lastName?: string;
  public userName?: string;

  public brand?: Brand;
}
