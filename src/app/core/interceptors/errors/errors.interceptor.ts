import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import e from 'express';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export const errorsInterceptor: HttpInterceptorFn = (req, next) => {
  
  const toastrService=inject(ToastrService)
  
  
  
  return next(req).pipe(catchError(   (err)=>{
      //logic to handle errors
      console.log(err.error.message)
      if(err.error.message== 'You are not logged in. Please login to get access'){
        console.log(err.error.message)
      }else{
        toastrService.error(err.error.message , 'FreshCart')
      }

    return throwError(  ()=>err  )
  }   ))
};
