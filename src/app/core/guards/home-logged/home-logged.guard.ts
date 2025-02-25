import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

// export const homeLoggedGuard: CanActivateFn = (route, state) => {
//   const router = inject(Router);

//   if ( localStorage.getItem('token') !== null) {
//     return false;
//   } else {
//     router.navigate(['/home']);
//     return true;
//   }
// };


export const homeLoggedGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  if (isPlatformBrowser(platformId)) {
    const token = localStorage.getItem('token');
    if (token && (route.url.some(segment => segment.path === 'login') || route.url.some(segment => segment.path === 'register'))) {
      router.navigate(['/home']);
      return false;
    }
  }

  return true;  // Allow access if no token or in other cases
};
