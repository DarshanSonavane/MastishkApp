import { Component, OnInit } from '@angular/core';
import { AppServiceService } from '../app-service.service'
import { ToastController , MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {
  forgotPasswordForm: FormGroup;
  isSubmitted = false;
  constructor( private router : Router ,public formBuilder: FormBuilder , private service : AppServiceService , private toastController : ToastController , public menu : MenuController) { }

  ngOnInit() {// /^\d{10}$/g
    this.forgotPasswordForm = this.formBuilder.group({
      contactNumber : ['', [Validators.required, Validators.pattern('^[0-9]+$') ,Validators.minLength(10)]],
    })
  }

  get errorControl() {
    return this.forgotPasswordForm.controls;
  }

  async presentToast(message:any) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  forgotPassword(){
    console.log("Here");
    this.isSubmitted = true;
    this.service.showLoader();
    this.service.forgotPassword(this.forgotPasswordForm.value).subscribe((res)=>{
      this.service.hideLoader();
      if(res['status'] == "200"){
        let userId = res['body'];
        this.presentToast('OTP sent to your resistered email id');
        this.router.navigate(['/verify-otp',userId]);
      }else {
        this.presentToast(res['body']);
      }
    },error=>{
      this.service.hideLoader();
    })
  }

  ionViewWillEnter() {
    this.menu.enable(false);
  }

}
