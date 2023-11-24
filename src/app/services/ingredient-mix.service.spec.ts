import { TestBed } from '@angular/core/testing';

import { IngredientMixService } from './ingredient-mix.service';

describe('IngredientMixService', () => {
  let service: IngredientMixService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IngredientMixService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
