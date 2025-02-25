import { routes } from './../../app.routes';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth/auth.service';
import { log } from 'console';
import { getAppScopedQueuedEventInfos } from '@angular/core/primitives/event-dispatch';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-forget-password',
  imports: [ ReactiveFormsModule , TranslatePipe  ],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss'
})
export class ForgetPasswordComponent {

private readonly authService = inject(AuthService)
private readonly router = inject(Router)



step:number= 1;

verfiyEmail :FormGroup = new FormGroup({
email : new FormControl(null ,[Validators.required , Validators.email] ),

})

verfiyCode :FormGroup = new FormGroup({
  resetCode : new FormControl(null ,[Validators.required ] )
  
  })

  resetPassword :FormGroup = new FormGroup({
    email : new FormControl(null ,[Validators.required , Validators.email] ),
    newPassword: new FormControl(null , [Validators.required  , Validators.pattern(/^[A-Z][A-Za-z0-9@$!%*?&]{7,}$/)]),

  })




  emailVerfiySubmit():void{
this.authService.setEmailVerfiy(this.verfiyEmail.value).subscribe({
  next: (res)=>{
console.log(res);
if (res.statusMsg=="success") {
  this.step = 2;
}
  },error:(err)=>{
console.log(err);

  }
})
  }


  verfiyCodeSubmit():void{
    this.authService.setCodeVerfiy(this.verfiyCode.value).subscribe({
      next: (res)=>{
    console.log(res);
    if (res.status=="Success") {
      this.step = 3;
    }
      },error:(err)=>{
    console.log(err);
      }
    })
      }


      resetSubmit():void{
        this.authService.setResetPassword(this.resetPassword.value).subscribe({
          next: (res)=>{
        console.log(res);

        localStorage.setItem('token', res.token);
        this.authService.getUserData();
        this.router.navigate(['/home']);
          },error:(err)=>{
        
          }
        })
          }
}
