import { Component, inject } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { AuthService } from '../../core/services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule , RouterLink , TranslatePipe],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {


  loginForm : FormGroup = new FormGroup({
    
    email: new FormControl(null , [Validators.required , Validators.email]),
    password: new FormControl(null , [Validators.required  , Validators.pattern(/^[A-Z][A-Za-z0-9@$!%*?&]{6,}$/)]),
    
  });
  

  isLoading: boolean = false;
  msgError: string = '';
  isSuccess: string = '';
  private readonly  authService = inject(AuthService);
  private readonly  router = inject(Router);

submitForm():void{
  if(this.loginForm.valid){
  this.isLoading = true;
  this.authService.sendloginForm(this.loginForm.value).subscribe({
    next: (res) => {
    this.isLoading = false;

    setTimeout(() => {
      localStorage.setItem('token', res.token);
      this.authService.getUserData();
      this.router.navigate(['/home']);
    }, 1000);
    
    this.isSuccess = res.message;
    console.log(res);
    },
    error: (err) => {
    console.log(err);
    this.msgError = err.error.message;

    setTimeout(() => {
      this.msgError = '';
    }, 2000);
    this.isLoading = false;

    }
    
    })
}

}




}
