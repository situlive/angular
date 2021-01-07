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

  public stateName(): string {
    switch (this.state) {
      case 0:
        return 'Reserved';
      case 1:
        return 'Pending';
      case 2:
        return 'Active';
      case 3:
        return 'Cancelled';
      case 4:
        return 'Expired';
      default:
        return 'Unknown';
    }
  }
}
