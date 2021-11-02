import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RedemHistoryComponent } from './redem-history.component';

describe('RedemHistoryComponent', () => {
  let component: RedemHistoryComponent;
  let fixture: ComponentFixture<RedemHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RedemHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RedemHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
