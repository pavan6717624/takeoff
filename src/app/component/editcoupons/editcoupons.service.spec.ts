import { TestBed } from '@angular/core/testing';

import { EditcouponsService } from './editcoupons.service';

describe('EditcouponsService', () => {
  let service: EditcouponsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditcouponsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
