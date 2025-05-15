import { TestBed } from '@angular/core/testing';

import { ResumeTransferService } from './resume-transfer.service';

describe('ResumeTransferService', () => {
  let service: ResumeTransferService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResumeTransferService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
