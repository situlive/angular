import { Brand } from './brand';
import { Plan } from './plan';
import { SubscriptionLine } from './subscription-line';
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
  termsAgreed: boolean;
  price?: number;

  brand?: Brand;
  plan?: Plan;
  venue?: Venue;
  lines?: SubscriptionLine[];
}
