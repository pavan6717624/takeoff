import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HitsRecordedComponent } from './hits-recorded.component';

describe('HitsRecordedComponent', () => {
  let component: HitsRecordedComponent;
  let fixture: ComponentFixture<HitsRecordedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HitsRecordedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HitsRecordedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
