import { TestBed } from '@angular/core/testing';

import { RestoTableClosedService } from './resto-table-closed.service';

describe('RestoTableClosedService', () => {
  let service: RestoTableClosedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestoTableClosedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
