import { HttpInterceptorFn } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';

export const headersInterceptor: HttpInterceptorFn = (req, next) => {
  const platformId = inject(PLATFORM_ID);

  if (isPlatformBrowser(platformId) && localStorage.getItem('token')) {
    req = req.clone({
      setHeaders: {
        token: localStorage.getItem('token')!
      }
    });
  }
  
  return next(req);
};
