import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import { AppServiceService } from '../app-service.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  isSubmitted = false;
  constructor(private router : Router , public formBuilder: FormBuilder , private service : AppServiceService) {}

  ngOnInit() {// /^\d{10}$/g
    this.loginForm = this.formBuilder.group({
      userName : ['', [Validators.required, Validators.pattern('^[0-9]+$') ,Validators.minLength(10)]],
      password : ['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,}'), Validators.minLength(8)]]
    })
  }
  get errorControl() {
    return this.loginForm.controls;
  }

  goToSignup(){
    this.router.navigate(['/registeration']);
  }

  goToForgotPassword(){
    this.router.navigate(['/forgot-password']);
  }

  doLogin(){
    this.isSubmitted = true;
    if(!this.loginForm.valid){
      console.log(this.loginForm.valid);
      console.log('Please provide all the required values!')
      return false;
    }else {
      this.service.doLogin(this.loginForm.value).subscribe((res)=>{
        console.log(res);
      })
      console.log(this.loginForm.value)
    }
  }

  goToUserProfile(){
    this.router.navigate(['/user-profile']);
  }
}
