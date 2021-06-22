import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-registeration',
  templateUrl: './registeration.page.html',
  styleUrls: ['./registeration.page.scss'],
})
export class RegisterationPage implements OnInit {
  registrationForm : FormGroup;
  isSubmitted = false;

  constructor(private router :Router , public formBuilder: FormBuilder) { }

  ngOnInit() {
    this.registrationForm = this.formBuilder.group({
      firstName : ['', Validators.compose([ Validators.pattern('[a-zA-Z]*'), Validators.required])],
      lastName : ['', Validators.compose([Validators.pattern('[a-zA-Z]*'), Validators.required])],
      email : ['', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])],
      mobileNumber : ['', Validators.compose([Validators.maxLength(10), Validators.pattern('[0-9]*'), Validators.required])],
      // role : ['', Validators.compose([Validators.maxLength(8), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      password : ['', Validators.compose([Validators.maxLength(8), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      confirmPassword : ['', Validators.compose([Validators.maxLength(8), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
    })
  }

  get errorControl() {
    return this.registrationForm.controls;
  }

  goToLogin(){
    this.router.navigate(['/']);
  }

  doRegister(){
    this.isSubmitted = true;
    if(!this.registrationForm.valid){
      console.log('Please provide all the required values!')
      return false;
    }else {
      console.log(this.registrationForm.value)
    }
  }

}
