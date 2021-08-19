import { Brand } from './brand';

export class BrandUser {
  id?: number;
  brandId: number;
  userId: string;
  confirmed: boolean;
  domain?: string;
  image?: string;
  jobTitle?: string;
  firstName?: string;
  lastName?: string;
  userName?: string;

  brand?: Brand;
}
