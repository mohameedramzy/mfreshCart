import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart/cart.service';
import { Icart } from '../../shared/interfaces/icart';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe , RouterLink , TranslatePipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {

  private readonly cartService=inject(CartService)
  private readonly toastrService = inject(ToastrService);


cartDetails:Icart = {} as Icart ;
ngOnInit(): void {
  this.getCartData()
}

getCartData():void{
  this.cartService.getLoggedUserCart().subscribe({
    next: (res) => {
      // console.log(res.data);
      this.cartDetails = res.data
    },
    error: (err) => {
      console.log(err);
    }
  })

}


removeProduct(id:string):void{

  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!"
  }).then((result) => {
    if (result.isConfirmed) {

      this.cartService.removeProductFromCart(id).subscribe({
        next: (res) => {
          // console.log(res);
          this.cartDetails = res.data
          if (res.status === 'success') {
            // Swal.fire({
            //   title: "Deleted!",
            //   text: "The product has been removed from your cart.",
            //   icon: "success"
            // });

            this.toastrService.success('The product has been successfully deleted .' , 'FreshCart')
          
            this.cartService.cartNum.next(res.numOfCartItems);
          }      
    
        },
        error:(err)=>{
          // console.log(err);
        }
      })

    }
  });


}


updateCount(id:string , newCount:number):void{
this.cartService.updateCountOfProduct(id , newCount).subscribe({
  next:(res)=>{
    // console.log(res);
    this.cartDetails = res.data
  },
  error:(err)=>{
    // console.log(err);
    
  }
})
}

}
