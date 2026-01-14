import { TestBed } from '@angular/core/testing';

import { ProductUtilityService } from './product.utility.service';

describe('ProductUtilityService', () => {
  let service: ProductUtilityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductUtilityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
