import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FranchizeComponent } from './franchize.component';

describe('FranchizeComponent', () => {
  let component: FranchizeComponent;
  let fixture: ComponentFixture<FranchizeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FranchizeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FranchizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
