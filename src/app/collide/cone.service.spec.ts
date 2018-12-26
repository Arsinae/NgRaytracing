import { TestBed, inject } from '@angular/core/testing';

import { ConeService } from './cone.service';

describe('ConeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConeService]
    });
  });

  it('should be created', inject([ConeService], (service: ConeService) => {
    expect(service).toBeTruthy();
  }));
});
