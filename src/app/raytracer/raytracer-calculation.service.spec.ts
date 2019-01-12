import { TestBed, inject } from '@angular/core/testing';

import { RaytracerCalculationService } from './raytracer-calculation.service';

describe('RaytracerCalculationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RaytracerCalculationService]
    });
  });

  it('should be created', inject([RaytracerCalculationService], (service: RaytracerCalculationService) => {
    expect(service).toBeTruthy();
  }));
});
