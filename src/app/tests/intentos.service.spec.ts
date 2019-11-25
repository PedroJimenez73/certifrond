import { TestBed } from '@angular/core/testing';

import { IntentosService } from './intentos.service';

describe('IntentosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IntentosService = TestBed.get(IntentosService);
    expect(service).toBeTruthy();
  });
});
