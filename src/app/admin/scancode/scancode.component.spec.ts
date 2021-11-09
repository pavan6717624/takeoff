import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScancodeComponent } from './scancode.component';

describe('ScancodeComponent', () => {
  let component: ScancodeComponent;
  let fixture: ComponentFixture<ScancodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScancodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScancodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
