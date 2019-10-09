import { TestBed } from '@angular/core/testing';

import { KwhService } from './kwh.service';

describe('KwhService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: KwhService = TestBed.get(KwhService);
    expect(service).toBeTruthy();
  });
});
