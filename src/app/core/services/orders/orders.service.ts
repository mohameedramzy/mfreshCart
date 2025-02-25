// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
// import { Observable, throwError } from 'rxjs';
// import { environment } from '../../environments/environment';
// import { isPlatformBrowser } from '@angular/common';

// @Injectable({
//   providedIn: 'root'
// })
// export class OrdersService {
//    private myToken: string | null = null;
  
//     constructor(
//       private httpClient: HttpClient,
//       @Inject(PLATFORM_ID) private platformId: Object
//     ) { 
//       // تأكد من تشغيل الكود فقط على المتصفح
//       if (isPlatformBrowser(this.platformId)) {
//         this.myToken = localStorage.getItem("token");
//         console.log("📌 Token from localStorage:", this.myToken);
//       }
//     }

    
//     checkoutPaymentOnline(id:string , data:object): Observable<any> {
//         if (!this.myToken) {
//           console.warn("❌ No token found! User might not be logged in.");
//           return throwError(() => new Error("No token found! Please log in."));
//         }
    
//         console.log("📌 Token being sent for Cart:", this.myToken);
    
//         return this.httpClient.post(`${environment.baseUrl}/api/v1/orders/checkout-session/${id}?url=http://localhost:4200`,
//         {
//           "shippingAddress": data
//         },
//         {
//           headers: new HttpHeaders({ token: this.myToken! })
//         });
//       }




//       checkoutPaymentCash(id:string , data:object): Observable<any> {
//         if (!this.myToken) {
//           console.warn("❌ No token found! User might not be logged in.");
//           return throwError(() => new Error("No token found! Please log in."));
//         }
    
//         console.log("📌 Token being sent for Cart:", this.myToken);
    
//         return this.httpClient.post(`${environment.baseUrl}/api/v1/orders/${id}`,
//         {
//           "shippingAddress": data
//         },
//         {
//           headers: new HttpHeaders({ token: this.myToken! })
//         });
//       }


//       getAllOrders(): Observable<any> {
    
//         return this.httpClient.get(`${environment.baseUrl}/api/v1/orders/user/${this.myToken}`)

//       }




// }




import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { isPlatformBrowser } from '@angular/common';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private myToken: string | null = null;
  private userId: string | null = null;
  private jwtHelper = new JwtHelperService();

  constructor(
    private httpClient: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { 
    if (isPlatformBrowser(this.platformId)) {
      this.myToken = localStorage.getItem("token");

      if (this.myToken) {
        try {
          const decodedToken = this.jwtHelper.decodeToken(this.myToken);
          this.userId = decodedToken?.userId || null;
          console.log("📌 Extracted User ID:", this.userId);
        } catch (error) {
          console.error("❌ Error decoding token:", error);
          this.userId = null;
        }
      }
    }
  }

  checkoutPaymentOnline(id: string, data: object): Observable<any> {
    if (!this.myToken) {
      console.warn("❌ No token found! User might not be logged in.");
      return throwError(() => new Error("No token found! Please log in."));
    }

    return this.httpClient.post(
      `${environment.baseUrl}/api/v1/orders/checkout-session/${id}?url=http://localhost:4200`,
      { "shippingAddress": data },
      { headers: new HttpHeaders({ token: this.myToken! }) }
    );
  }

  checkoutPaymentCash(id: string, data: object): Observable<any> {
    if (!this.myToken) {
      console.warn("❌ No token found! User might not be logged in.");
      return throwError(() => new Error("No token found! Please log in."));
    }

    return this.httpClient.post(
      `${environment.baseUrl}/api/v1/orders/${id}`,
      { "shippingAddress": data },
      { headers: new HttpHeaders({ token: this.myToken! }) }
    );
  }



  getAllOrders(): Observable<any> {
    // استرجاع userId من localStorage
    const userId = localStorage.getItem('id');
  
    if (!userId) {
      console.warn("❌ No User ID found! User might not be logged in.");
      return throwError(() => new Error("No User ID found! Please log in."));
    }
  
    return this.httpClient.get(`${environment.baseUrl}/api/v1/orders/user/${userId}`);
  }
  
  
}

