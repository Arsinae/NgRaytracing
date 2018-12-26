import { TestBed, inject } from '@angular/core/testing';

import { HyperboleService } from './hyperbole.service';

describe('HyperboleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HyperboleService]
    });
  });

  it('should be created', inject([HyperboleService], (service: HyperboleService) => {
    expect(service).toBeTruthy();
  }));
});
