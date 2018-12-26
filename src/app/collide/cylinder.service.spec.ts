import { TestBed, inject } from '@angular/core/testing';

import { Collide\cylinderService } from './collide\cylinder.service';

describe('Collide\cylinderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Collide\cylinderService]
    });
  });

  it('should be created', inject([Collide\cylinderService], (service: Collide\cylinderService) => {
    expect(service).toBeTruthy();
  }));
});
