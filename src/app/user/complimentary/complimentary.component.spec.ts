import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplimentaryComponent } from './complimentary.component';

describe('ComplimentaryComponent', () => {
  let component: ComplimentaryComponent;
  let fixture: ComponentFixture<ComplimentaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComplimentaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComplimentaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
