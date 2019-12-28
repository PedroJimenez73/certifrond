import { TestBed } from '@angular/core/testing';

import { ExamenesService } from './examenes.service';

describe('ExamenesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExamenesService = TestBed.get(ExamenesService);
    expect(service).toBeTruthy();
  });
});
