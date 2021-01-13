import { Input } from '@angular/core';

import { Element } from '../_core/models';

export class ContentfulComponent {
  @Input() element: Element;

  constructor() {}
}
