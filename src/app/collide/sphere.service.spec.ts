import { TestBed, inject } from '@angular/core/testing';

import { SphereService } from './sphere.service';

describe('SphereService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SphereService]
    });
  });

  it('should be created', inject([SphereService], (service: SphereService) => {
    expect(service).toBeTruthy();
  }));
});
