import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewcouponsComponent } from './viewcoupons.component';

describe('ViewcouponsComponent', () => {
  let component: ViewcouponsComponent;
  let fixture: ComponentFixture<ViewcouponsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewcouponsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewcouponsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
