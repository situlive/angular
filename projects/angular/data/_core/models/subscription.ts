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

export enum SubscriptionBillingPeriod {
  Monthly,
  Quarterly,
  Annually,
}

export class Subscription {
  id: number;
  brandId: number;
  planId: number;
  venueId: number;
  billingPeriod: SubscriptionBillingPeriod;
  state: SubscriptionState;
  startDate: string;
  endDate: string;
  termsAgreed: boolean;
  price?: number;
  expectedDailyDemos?: number;
  expectedDailyStories?: number;
  expectedDailyScans?: number;
  expectedDailyClicks?: number;
  isBillable: boolean;

  brand?: Brand;
  plan?: Plan;
  venue?: Venue;
  lines?: SubscriptionLine[];
}