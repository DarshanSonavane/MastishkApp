import { Component, OnInit } from '@angular/core';
import { AppServiceService } from '../app-service.service'
import { ToastController , MenuController } from '@ionic/angular';
import { Router , ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';

@Component({
  selector: 'app-verify-otp',
  templateUrl: './verify-otp.page.html',
  styleUrls: ['./verify-otp.page.scss'],
})
export class VerifyOtpPage implements OnInit {
  verifyOtpForm : FormGroup;
  isSubmitted = false;
  userId:any;
  constructor(private activateRoute : ActivatedRoute ,private router : Router ,public formBuilder: FormBuilder , private service : AppServiceService , private toastController : ToastController , public menu : MenuController ) { }

  ngOnInit() {// /^\d{10}$/g
    this.userId = this.activateRoute.snapshot.paramMap.get('userId');
    console.log("UserId Form Route====", this.userId);
    this.verifyOtpForm = this.formBuilder.group({
      otp : ['', [Validators.required, Validators.pattern('^[0-9]+$') ,Validators.minLength(6)]],
    })
  }

  async presentToast(message:any) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  verifyOTP(){
    this.isSubmitted = true;
    this.service.showLoader();
    this.service.verifyOtp(this.verifyOtpForm.value,this.userId).subscribe((res)=>{
      this.service.hideLoader();
      if(res['status'] == "200"){
        this.router.navigate(['/reset-password' , this.userId]);
      }else{
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
