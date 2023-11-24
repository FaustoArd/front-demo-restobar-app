import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientMixComponent } from './ingredient-mix.component';

describe('IngredientMixComponent', () => {
  let component: IngredientMixComponent;
  let fixture: ComponentFixture<IngredientMixComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IngredientMixComponent]
    });
    fixture = TestBed.createComponent(IngredientMixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
