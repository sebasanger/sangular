import { TestBed } from '@angular/core/testing';

import { ActivateAcountService } from './activate-acount.service';

describe('ActivateAcountService', () => {
  let service: ActivateAcountService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActivateAcountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
