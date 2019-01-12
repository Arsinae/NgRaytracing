import { TestBed, inject } from '@angular/core/testing';

import { ShadowService } from './shadow.service';

describe('ShadowService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShadowService]
    });
  });

  it('should be created', inject([ShadowService], (service: ShadowService) => {
    expect(service).toBeTruthy();
  }));
});
