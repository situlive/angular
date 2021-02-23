import { Brand } from './brand';

export class BrandUser {
  id?: number;
  brandId: number;
  userId: string;
  confirmed: boolean;
  domain?: string;

  brand?: Brand;
}
