import { TestBed } from '@angular/core/testing';

import { UploadcouponsService } from './uploadcoupons.service';

describe('UploadcouponsService', () => {
  let service: UploadcouponsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UploadcouponsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
