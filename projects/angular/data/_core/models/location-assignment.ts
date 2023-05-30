import { LocationAssignmentState, Location, Brand } from '.';

export class LocationAssignment {
  public id: number;
  public brandId: number;
  public locationId: number;
  public productId?: string;

  public startDate?: string;
  public endDate?: string;
  public state?: LocationAssignmentState;

  public brand?: Brand;
  public location?: Location;
}
