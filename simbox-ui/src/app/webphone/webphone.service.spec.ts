import { TestBed } from '@angular/core/testing';

import { WebphoneService } from './webphone.service';

describe('WebphoneService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WebphoneService = TestBed.get(WebphoneService);
    expect(service).toBeTruthy();
  });
});
