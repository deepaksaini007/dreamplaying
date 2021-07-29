import { TestBed } from '@angular/core/testing';

import { SyncHelperGuard } from './sync-helper.guard';

describe('SyncHelperGuard', () => {
  let guard: SyncHelperGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SyncHelperGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
