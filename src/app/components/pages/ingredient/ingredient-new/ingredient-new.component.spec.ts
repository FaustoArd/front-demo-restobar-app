import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientNewComponent } from './ingredient-new.component';

describe('IngredientNewComponent', () => {
  let component: IngredientNewComponent;
  let fixture: ComponentFixture<IngredientNewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IngredientNewComponent]
    });
    fixture = TestBed.createComponent(IngredientNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
