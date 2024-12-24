import { TestBed } from '@angular/core/testing';

import { ApiThemealbdService } from './api-themealbd.service';

describe('ApiThemealbdService', () => {
  let service: ApiThemealbdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiThemealbdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
