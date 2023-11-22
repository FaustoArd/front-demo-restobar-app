import { TestBed } from '@angular/core/testing';

import { RestoTablesService } from './resto-table.service';

describe('RestoTablesService', () => {
  let service: RestoTablesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestoTablesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
