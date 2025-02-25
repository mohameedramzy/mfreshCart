import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { homeLoggedGuard } from './home-logged.guard';

describe('homeLoggedGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => homeLoggedGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
