import { TestBed } from '@angular/core/testing';

import { RuserService } from './ruser.service';

describe('RuserService', () => {
  let service: RuserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RuserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
