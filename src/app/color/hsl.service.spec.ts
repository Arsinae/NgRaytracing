import { TestBed, inject } from '@angular/core/testing';

import { HslService } from './hsl.service';

describe('HslService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HslService]
    });
  });

  it('should be created', inject([HslService], (service: HslService) => {
    expect(service).toBeTruthy();
  }));
});
