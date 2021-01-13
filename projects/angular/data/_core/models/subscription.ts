import { Brand } from './brand';
import { Plan } from './plan';
import { Venue } from './venue';

export class Subscription {
  id: number;
  brandId: number;
  planId: number;
  venueId: number;
  state: number;
  startDate: string;
  endDate: string;
  rolling: boolean;
  overridePlan: boolean;
  productCount: number;
  price: number;
  termsAgreed: boolean;

  brand?: Brand;
  plan?: Plan;
  venue?: Venue;
}
