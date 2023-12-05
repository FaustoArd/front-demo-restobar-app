import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientCategoryComponent } from './ingredient-category.component';

describe('IngredientCategoryComponent', () => {
  let component: IngredientCategoryComponent;
  let fixture: ComponentFixture<IngredientCategoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IngredientCategoryComponent]
    });
    fixture = TestBed.createComponent(IngredientCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
