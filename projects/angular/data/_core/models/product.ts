import { SpecificationData } from './specification-data';
import { Base } from './base';
import { IKey } from './key';

export class Product extends Base implements IKey {
  id: string;
  variant: string;
  title: string;
  categoryId: number;
  state: 'Complete' | 'Incomplete' | 'Live' | 'NewEntry';
  specification: SpecificationData;
  images: string[];
  selected?: boolean;
}
