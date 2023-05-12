import { Orderable } from './orderable';

export class Title extends Orderable {
  public declare id: number;
  public categoryId: number;
  public expression: string;
  public prefix?: string;
  public suffix?: string;
  public supressSpaces: boolean;
  public usePath: boolean;
}
