import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablesClosedComponent } from './tables-closed.component';

describe('TablesClosedComponent', () => {
  let component: TablesClosedComponent;
  let fixture: ComponentFixture<TablesClosedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TablesClosedComponent]
    });
    fixture = TestBed.createComponent(TablesClosedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
