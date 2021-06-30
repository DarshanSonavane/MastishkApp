import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import { AppServiceService } from '../app-service.service'
import { ToastController , MenuController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  isSubmitted = false;
  constructor(private router : Router , public formBuilder: FormBuilder , private service : AppServiceService , public toastController: ToastController , public menu : MenuController) {}

  ngOnInit() {// /^\d{10}$/g
    this.loginForm = this.formBuilder.group({
      userName : ['', [Validators.required, Validators.pattern('[0-9]{10}') ,Validators.minLength(10)]],
      password : ['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,}'), Validators.minLength(8)]]
    })
  }
  get errorControl() {
    return this.loginForm.controls;
  }

  ionViewWillEnter() {
    this.menu.enable(false);
  }

  goToSignup(){
    this.router.navigate(['/registeration']);
  }

  goToForgotPassword(){
    this.router.navigate(['/forgot-password']);
  }

  async presentToast(message:any) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  doLogin(){
    this.isSubmitted = true;
    if(!this.loginForm.valid){
      console.log(this.loginForm.valid);
      console.log('Please provide all the required values!')
      return false;
    }else {
      this.service.doLogin(this.loginForm.value).subscribe((res)=>{
        if(res['status'] == "200"){
          this.presentToast(res['status']);
          localStorage.setItem("userId", res['userId']);
          localStorage.setItem("token",res['token']);
          let userDetails = res['user'];
          console.log("Type",userDetails);
          if(userDetails.type == '1'){
            this.router.navigate(['/user-profile']);
          }else if(userDetails.type == '2'){
            // Navigate to doctor profile
            this.router.navigate(['/doctor-profile']);
          }else if(userDetails.type == '3'){
            // Navigate To Health Workers Profile
          }
        }else {
          this.presentToast(res['description']);
        }
      })
    }
  }

  

  goToUserProfile(){
    this.router.navigate(['/user-profile']);
  }

  goToDoctorProfile(){
    this.router.navigate(['/doctor-profile']);
  }
}
