import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendoraccountComponent } from './vendoraccount.component';

describe('VendoraccountComponent', () => {
  let component: VendoraccountComponent;
  let fixture: ComponentFixture<VendoraccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendoraccountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VendoraccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
