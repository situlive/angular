import { DemoUnitLocationState, Location } from '.';

export class DemoUnitLocation {
  public id: number;
  public demoUnitId: number;
  public locationId: number;

  public returned: boolean;
  public startDate?: string;
  public endDate?: string;
  public state?: DemoUnitLocationState;

  public location?: Location;
}
