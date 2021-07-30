import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadcouponsComponent } from './uploadcoupons.component';

describe('UploadcouponsComponent', () => {
  let component: UploadcouponsComponent;
  let fixture: ComponentFixture<UploadcouponsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadcouponsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadcouponsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
