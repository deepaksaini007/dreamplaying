import { TestBed } from '@angular/core/testing';

import { MasterAppService } from './master-app.service';

describe('MasterAppService', () => {
  let service: MasterAppService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MasterAppService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
