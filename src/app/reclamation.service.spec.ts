import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ReclamationService } from './reclamation.service';
import { Reclamation } from './module/Reclamation';

describe('ReclamationService', () => {
  let service: ReclamationService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ReclamationService]
    });
    service = TestBed.inject(ReclamationService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verify that there are no outstanding requests
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // Write similar tests for other methods like addReclamation, getReclamation, removeReclamation, and modifyReclamation
});
