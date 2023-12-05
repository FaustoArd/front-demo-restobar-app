import { TestBed } from '@angular/core/testing';

import { RestoTableService } from './resto-table.service';

describe('RestoTablesService', () => {
  let service: RestoTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestoTableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
