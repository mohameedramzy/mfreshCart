import { Component, inject, input, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';
import { CartService } from '../../core/services/cart/cart.service';
import {  TranslationService } from '../../core/services/myTranslate/my-translate.service';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive , TranslatePipe ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
isLogin = input<boolean>(true)
numOfCartItem!:number;
countWishlist!:number;


  readonly  authService= inject(AuthService)
  readonly  cartService= inject(CartService)
  readonly  wishlistService= inject(WishlistService)
  private readonly  translationService= inject(TranslationService)



  isOpen = false;



 ngOnInit(): void {
      this.cartService.cartNum.subscribe({
        next: (value) => {
          this.numOfCartItem = value;
        }
      })
 
 this.cartService.getLoggedUserCart().subscribe({
      next: (res) => {
this.cartService.cartNum.next(res.numOfCartItems);

      }
 })
 




//  wishlist
this.wishlistService.countWishlist.subscribe({
  next: (value) => {
    this.countWishlist = value;
  }
})

this.wishlistService.getLoggedUserWishlist().subscribe({
  next: (res) => {
    this.wishlistService.countWishlist.next(res.count);

  }
    });


  }





  changeLanguage(lang:string):void{
this.translationService.changeLang(lang);
  }
}
