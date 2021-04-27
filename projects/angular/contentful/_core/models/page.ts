import { Element } from './element';
import { Image } from './image';
import { Metadata } from './metadata';

export class Page implements Metadata {
  title: string;
  description: string;
  image: Image;

  slug: string;
  linkText: string;
  elements: Element[];
  menu?: Element;
}
