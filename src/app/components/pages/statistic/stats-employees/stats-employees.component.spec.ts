import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsEmployeesComponent } from './stats-employees.component';

describe('StatsEmployeesComponent', () => {
  let component: StatsEmployeesComponent;
  let fixture: ComponentFixture<StatsEmployeesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StatsEmployeesComponent]
    });
    fixture = TestBed.createComponent(StatsEmployeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
