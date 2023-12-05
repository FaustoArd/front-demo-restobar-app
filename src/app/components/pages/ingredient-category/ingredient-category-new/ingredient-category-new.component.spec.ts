import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientCategoryNewComponent } from './ingredient-category-new.component';

describe('IngredientCategoryNewComponent', () => {
  let component: IngredientCategoryNewComponent;
  let fixture: ComponentFixture<IngredientCategoryNewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IngredientCategoryNewComponent]
    });
    fixture = TestBed.createComponent(IngredientCategoryNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
