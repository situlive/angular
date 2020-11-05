import { Injector } from '@angular/core';
import { Router } from '@angular/router';

import { PageService } from './page.service';

const services = {
  providers: [
    { provide: 'ROUTER', useValue: Router },
    { provide: 'PAGE_SERVICE', useValue: PageService },
  ],
};

export const locator = Injector.create(services);
