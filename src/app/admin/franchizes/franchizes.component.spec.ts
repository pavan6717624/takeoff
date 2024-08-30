import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FranchizesComponent } from './franchizes.component';

describe('FranchizesComponent', () => {
  let component: FranchizesComponent;
  let fixture: ComponentFixture<FranchizesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FranchizesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FranchizesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
