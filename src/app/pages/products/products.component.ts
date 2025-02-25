import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products/products.service';
import { CartService } from '../../core/services/cart/cart.service';
import { Iproduct } from '../../shared/interfaces/iproduct';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from "../../shared/pipes/search/search.pipe";
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-products',
  imports: [RouterLink , FormsModule, SearchPipe, CurrencyPipe , CommonModule , TranslatePipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {


products:Iproduct[] = [];
private readonly productsService = inject(ProductsService);
private readonly cartService = inject(CartService);
private readonly toastrService = inject(ToastrService);
private readonly wishlistService = inject(WishlistService);


nameProduct: string = '';

  getProductsData():void{
    this.productsService.getALlProducts().subscribe({
      next: (res) => {
        console.log(res.data);
        this.products = res.data;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  ngOnInit(): void {
    this.getProductsData();
    this.getWishlist();

  }

  addToCart(id:string):void{
    this.cartService.addProductToCart(id).subscribe({
      next: (res) => {
        console.log( res);
        if (res.status === 'success') {
          this.toastrService.success(res.message , 'FreshCart')
          this.cartService.cartNum.next(res.numOfCartItems);
        }
      },
      error: (err) => {
        console.log(err);
      }
    });
  }





  
addToWishlist(id: string): void {
  const isInWishlist = this.wishlist.includes(id);

  if (isInWishlist) {
    // If the product exists, remove it
    this.wishlistService.removeProductFromWishlist(id).subscribe({
      next: (res) => {
        if (res.status === 'success') {
          this.toastrService.warning(res.message, 'FreshCart');
          this.wishlist = this.wishlist.filter(item => item !== id);
          this.wishlistService.countWishlist.next(res.data.length);

        }
      },
      error: (err) => console.log("Error while removing product from wishlist:", err)
    });
  } else {
    // If the product does not exist, add it
    this.wishlistService.addProductToWishlist(id).subscribe({
      next: (res) => {
        if (res.status === 'success') {
          this.toastrService.success(res.message, 'FreshCart');
          this.wishlist.push(id);
          this.wishlistService.countWishlist.next(res.data.length);

        }
      },
      error: (err) => console.log("Error while adding product to wishlist:", err)
    });
  }
}




getWishlist() {
  this.wishlistService.getLoggedUserWishlist().subscribe({
    next: (res) => {
      this.wishlist = res.data.map((item: any) => item._id); 
    },
    error: (err) => {
      console.error(err);
    }
  });
}


wishlist: string[] = [];


isInWishlist(productId: string) {
  if (this.wishlist.includes(productId)) {
    // If the product exists, remove it
    this.wishlistService.removeProductFromWishlist(productId).subscribe({
      next: () => {
        this.wishlist = this.wishlist.filter(id => id !== productId); // Remove the product from the array
      },
      error: (err) => console.error("Error while removing product from wishlist:", err)
    });
  } else {
    // If the product does not exist, add it
    this.wishlistService.addProductToWishlist(productId).subscribe({
      next: () => {
        this.wishlist.push(productId); // Add the product to the array
      },
      error: (err) => console.error("Error while adding product to wishlist:", err)
    });
  }
}


}
