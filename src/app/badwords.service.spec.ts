import { TestBed } from '@angular/core/testing';

import { BadwordsService } from './badwords.service';

describe('BadwordsService', () => {
  let service: BadwordsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BadwordsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
