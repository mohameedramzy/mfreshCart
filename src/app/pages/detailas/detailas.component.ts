import { Component, inject, OnInit, TrackByFunction } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/products/products.service';
import { Iproduct } from '../../shared/interfaces/iproduct';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-detailas',
  imports: [CommonModule , TranslatePipe , CurrencyPipe],
  templateUrl: './detailas.component.html',
  styleUrl: './detailas.component.scss'
})
export class DetailasComponent  implements OnInit {

  productId:any;
  productDetails:Iproduct = {} as Iproduct;

  private readonly  productsService = inject(ProductsService)
  private readonly activatedRoute= inject(ActivatedRoute)
  private readonly cartService= inject(CartService)
  private readonly toastrService= inject(ToastrService)
 
  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe( {

      next: (res) => {
        this.productId = res.get('id')
        // console.log(this.productId)

        this.productsService.getSpecificProducts(this.productId).subscribe({

          next: (res) => {
            this.productDetails = res.data

          },
          error: (err) => {
            // console.log(err)
          }
        })

      }
    })

    

  }



  addToCart(id:string):void{
    this.cartService.addProductToCart(id).subscribe({
      next: (res) => {
        // console.log( res);
        if (res.status === 'success') {
          
          this.toastrService.success(res.message , 'FreshCart')
          this.cartService.cartNum.next(res.numOfCartItems);
        }
      },
      error: (err) => {
        // console.log(err);
      }
    });
  }



  selectedImage: string | null = null;

changeMainImage(image: string) {
  this.selectedImage = image;
}

}
