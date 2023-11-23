import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientModifyComponent } from './ingredient-modify.component';

describe('IngredientModifyComponent', () => {
  let component: IngredientModifyComponent;
  let fixture: ComponentFixture<IngredientModifyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IngredientModifyComponent]
    });
    fixture = TestBed.createComponent(IngredientModifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
