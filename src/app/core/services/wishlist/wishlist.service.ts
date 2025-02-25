import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  countWishlist:BehaviorSubject<number>  = new BehaviorSubject(0);


  constructor(private httpClient: HttpClient) {}


  //addProductToWishlist
  addProductToWishlist(id: string): Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}/api/v1/wishlist`,{ "productId": id });
  }


//getLoggedUserWishlist
  getLoggedUserWishlist(): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}/api/v1/wishlist`);
  }


//removeProductFromWishlist
  removeProductFromWishlist(id:string): Observable<any> {
    return this.httpClient.delete(`${environment.baseUrl}/api/v1/wishlist/${id}`);
  }





}



