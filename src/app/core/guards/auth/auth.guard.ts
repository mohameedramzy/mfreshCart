// import { inject } from '@angular/core';
// import { CanActivateFn, Router } from '@angular/router';

// export const authGuard: CanActivateFn = (route, state) => {
//   const router = inject(Router);

//   if ( localStorage.getItem('token') !== null) {
//     return true;
//   } else {
//     router.navigate(['/login']);
//     return false;
//   }
// };


import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CanActivateFn, Router } from '@angular/router';
export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  if (isPlatformBrowser(platformId)) {
    const token = localStorage.getItem('token');
    if (token !== null) {
      return true;  // Allow access if token exists
    } else {
      router.navigate(['/login']);
      return false;
    }
  }

  return false;  // Handle cases where no token exists
};
