import { TestBed } from '@angular/core/testing';

import { W10002Service } from './w10002.service';

describe('W10002Service', () => {
  let service: W10002Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(W10002Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
