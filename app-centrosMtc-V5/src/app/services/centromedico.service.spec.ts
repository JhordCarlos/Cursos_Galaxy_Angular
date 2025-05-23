import { TestBed } from '@angular/core/testing';

import { CentromedicoService } from './centromedico.service';

describe('CentromedicoService', () => {
  let service: CentromedicoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CentromedicoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
