import { TestBed } from '@angular/core/testing';

import { CpssmainService } from './cpssmain.service';

describe('CpssmainService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CpssmainService = TestBed.get(CpssmainService);
    expect(service).toBeTruthy();
  });
});
