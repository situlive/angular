import { Brand } from './brand';
import { Plan } from './plan';
import { Venue } from './venue';

export enum SubscriptionState {
  Reserved,
  Pending,
  Active,
  Cancelled,
  Expired,
}

export class Subscription {
  id: number;
  brandId: number;
  planId: number;
  venueId: number;
  state: SubscriptionState;
  startDate: string;
  endDate: string;
  rolling: boolean;
  overridePlan: boolean;
  allowedUnitCount: number;
  issuedUnitCount?: number;
  price: number;
  termsAgreed: boolean;

  brand?: Brand;
  plan?: Plan;
  venue?: Venue;
}
