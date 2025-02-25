import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import {jwtDecode} from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient:HttpClient) {}

  private readonly  router = inject(Router);


  sendRegisterForm(data: object): Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}/api/v1/auth/signup`, data );
  }


  sendloginForm(data: object): Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}/api/v1/auth/signin`, data );
  }


 userToken:any;
  getUserData():void{
    this.userToken = jwtDecode(localStorage.getItem('token')!);
    console.log(this.userToken);
  }


logOut():void{
  localStorage.removeItem('token');
  this.userToken = null;
this.router.navigate(['/login']);

}



setEmailVerfiy(data:object):Observable<any>{
  return this.httpClient.post(`${environment.baseUrl}/api/v1/auth/forgotPasswords`, data);
}

setCodeVerfiy(data:object):Observable<any>{
  return this.httpClient.post(`${environment.baseUrl}/api/v1/auth/verifyResetCode`, data);
}

setResetPassword(data:object):Observable<any>{
  return this.httpClient.put(`${environment.baseUrl}/api/v1/auth/resetPassword`, data);
}



}
