import { TestBed } from '@angular/core/testing';

import { SituAngularComponentsService } from './situ-angular-components.service';

describe('SituAngularComponentsService', () => {
  let service: SituAngularComponentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SituAngularComponentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
