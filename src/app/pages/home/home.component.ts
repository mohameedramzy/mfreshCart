import { CategoriesService } from './../../core/services/caregories/categories.service';
import { Iproduct } from './../../shared/interfaces/iproduct';
import { Icategory } from './../../shared/interfaces/icategory';
import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products/products.service';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { ScrollAnimationDirective } from '../../shared/directives/scroll-animation/scroll-animation.directive';
import { SearchPipe } from '../../shared/pipes/search/search.pipe';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';


@Component({
  selector: 'app-home',
  imports: [RouterLink, RouterLinkActive ,TranslatePipe, CurrencyPipe , CarouselModule , ScrollAnimationDirective , SearchPipe , FormsModule, CommonModule ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {


  nameProduct: string = '';


  private readonly   categoriesService = inject(CategoriesService);


private readonly productsService = inject(ProductsService);
private readonly cartService = inject(CartService);
private readonly toastrService = inject(ToastrService);
private readonly wishlistService = inject(WishlistService);


products:Iproduct[] = [];
categories:Icategory[] = [];
wishlist: string[] = [];



ngOnInit(): void {
  this.getProductsData();
  this.getcategoryData();
  this.getWishlist();
}




// mainSlider
customMainSlider: OwlOptions = {
  loop: true,
  mouseDrag: true,
  touchDrag: true,
  autoplay: true,
  rtl: true,
  autoplayTimeout: 2500, 
  autoplayHoverPause: true,
  pullDrag: false,
  dots: false,
  navSpeed: 700,
  navText: ['', ''],
  items:1 , 
  nav: false
}

// catigorySlider
customOptions: OwlOptions = {
  loop: true,
  mouseDrag: true,
  touchDrag: true,
  autoplay: true,
  rtl: true,
  autoplayTimeout: 2500, 
  autoplayHoverPause: true,
  pullDrag: false,
  dots: false,
  navSpeed: 700,
  navText: ['', ''],
  responsive: {
    0: {
      items: 1
    },
    400: {
      items: 2
    },
    740: {
      items: 3
    },
    940: {
      items: 4
    }
  },
  nav: true
}

// getProductsData
getProductsData():void{
  this.productsService.getALlProducts().subscribe({
    next: (res) => {
      // console.log(res.data);
      this.products = res.data;
    },
    error: (error) => {
      // console.log(error);
    }
  });
}

// getcategoryData
getcategoryData():void{
  this.categoriesService.getAllCategory().subscribe({
    next: (res) => {
      // console.log(res.data);
      this.categories = res.data;
    },
    error: (error) => {
      // console.log(error);
    }
  });
}


// addToCart
addToCart(id:string):void{
  this.cartService.addProductToCart(id).subscribe({
    next: (res) => {
      // console.log( res);
      if (res.status === 'success') {
        
        this.toastrService.success(res.message , 'FreshCart')

        this.cartService.cartNum.next(res.numOfCartItems);
        // console.log(this.cartService.cartNum.getValue());
      }
    },
    error: (err) => {
      // console.log(err);
    }
  });
}




// addToWishlist
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
      error: (err) =>{
 //console.log("Error while removing product from wishlist:", err)
      }
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
      error: (err) =>{
        // console.log("Error while adding product to wishlist:", err)
      } 
    });
  }
}

// getWishlist
getWishlist() {
  this.wishlistService.getLoggedUserWishlist().subscribe({
    next: (res) => {
      this.wishlist = res.data.map((item: any) => item._id); 
    },
    error: (err) => {
      // console.error("❌ خطأ في جلب قائمة المفضلة:", err);
    }
  });
}



// isInWishlist
isInWishlist(productId: string) {
  if (this.wishlist.includes(productId)) {
    // If the product exists, remove it
    this.wishlistService.removeProductFromWishlist(productId).subscribe({
      next: () => {
        this.wishlist = this.wishlist.filter(id => id !== productId); // Remove the product from the array
      },
      error: (err) =>{
        // console.error("Error while removing product from wishlist:", err)
      } 
    });
  } else {
    // If the product does not exist, add it
    this.wishlistService.addProductToWishlist(productId).subscribe({
      next: () => {
        this.wishlist.push(productId); // Add the product to the array

      },
      error: (err) =>{
        // console.error("Error while adding product to wishlist:", err)
      } 
    });
  }
}






}
