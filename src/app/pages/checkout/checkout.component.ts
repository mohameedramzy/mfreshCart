import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { subscribe } from 'diagnostics_channel';
import { OrdersService } from '../../core/services/orders/orders.service';
import { error } from 'console';
import { ToastrService } from 'ngx-toastr';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule , TranslatePipe],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit {

  private readonly activatedRoute=inject(ActivatedRoute)
  private readonly ordersService=inject(OrdersService)
  private readonly toastrService = inject(ToastrService);
  private readonly router = inject(Router);


cartId:string="";
userId:string=""

checkOutForm!:FormGroup ;

ngOnInit(): void {
this.initForm();
this.getCartId();
}

initForm():void{
  this.checkOutForm = new FormGroup({
    details : new FormControl(null , Validators.required ),
    phone: new FormControl(null , [Validators.required , Validators.pattern(/^01[0125][0-9]{8}$/)]),
    city : new FormControl(null , Validators.required )
  })
}

getCartId():void{
  this.activatedRoute.paramMap.subscribe({
    next:(param)=>{
 this.cartId =  param.get('id') !
    }
  })
}


submitPaymentOnline():void{
  console.log(this.checkOutForm.value);
  
  this.ordersService.checkoutPaymentOnline(this.cartId , this.checkOutForm.value).subscribe({
    next: (res)=>{
if(res.status == 'success'){
open(res.session.url , '_self')
}

    },
    error: (err)=>{
      console.log(err);
      
    }
  })
}


submitPaymentCash():void{
  console.log(this.checkOutForm.value);
  
  this.ordersService.checkoutPaymentCash(this.cartId , this.checkOutForm.value).subscribe({
    next: (res)=>{
if(res.status == 'success'){
  this.userId = res.data.user
  localStorage.setItem('id' ,this.userId)
  this.toastrService.success(' Order confirmed! You have chosen Cash on Delivery. Please have the amount ready upon delivery .' , 'FreshCart')

  setTimeout(() => {
    this.router.navigate(['/allorders']);
  }, 1300);

  console.log(res);
  
}

    },
    error: (err)=>{
      console.log(err);
      
    }
  })
}
}
