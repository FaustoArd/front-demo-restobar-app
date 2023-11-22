import { TestBed } from '@angular/core/testing';

import { WorkingDayService } from './working-day.service';

describe('WorkingDayService', () => {
  let service: WorkingDayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkingDayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
