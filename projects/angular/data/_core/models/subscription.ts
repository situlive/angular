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
  public id: number;
  public brandId: number;
  public planId: number;
  public venueId: number;
  public billingPeriod: SubscriptionBillingPeriod;
  public state: SubscriptionState;
  public startDate: string;
  public endDate: string;
  public termsAgreed: boolean;
  public price?: number;
  public targetDemos?: number;
  public targetRecipients?: number;
  public targetScans?: number;
  public targetLeads?: number;
  public isBillable: boolean;
  public visibleToBrand: boolean;

  public brand?: Brand;
  public plan?: Plan;
  public venue?: Venue;
  public lines?: SubscriptionLine[];
}
