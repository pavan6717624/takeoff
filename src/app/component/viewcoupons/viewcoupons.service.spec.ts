import { TestBed } from '@angular/core/testing';

import { ViewcouponsService } from './viewcoupons.service';

describe('ViewcouponsService', () => {
  let service: ViewcouponsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewcouponsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
