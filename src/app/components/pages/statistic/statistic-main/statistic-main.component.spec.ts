import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticMainComponent } from './statistic-main.component';

describe('StatisticMainComponent', () => {
  let component: StatisticMainComponent;
  let fixture: ComponentFixture<StatisticMainComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StatisticMainComponent]
    });
    fixture = TestBed.createComponent(StatisticMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
