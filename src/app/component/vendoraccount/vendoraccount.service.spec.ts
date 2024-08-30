import { TestBed } from '@angular/core/testing';

import { VendoraccountService } from './vendoraccount.service';

describe('VendoraccountService', () => {
  let service: VendoraccountService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VendoraccountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
