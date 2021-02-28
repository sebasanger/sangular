import { TestBed } from '@angular/core/testing';

import { ReqValidatorsService } from './req-validators.service';

describe('ReqValidatorsService', () => {
  let service: ReqValidatorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReqValidatorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
