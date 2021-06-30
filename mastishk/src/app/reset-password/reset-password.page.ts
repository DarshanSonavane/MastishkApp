import { Component, OnInit } from '@angular/core';
import { Router , ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import { AppServiceService} from '../app-service.service'
import { ToastController , MenuController } from '@ionic/angular';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {
  resetPasswordForm : FormGroup;
  isSubmitted : false;
  userId:any;
  constructor(private activateRoute : ActivatedRoute ,private router : Router ,public formBuilder: FormBuilder , private service : AppServiceService , private toastController : ToastController , public menu : MenuController ) { }

  ngOnInit() {// /^\d{10}$/g
    this.userId = this.activateRoute.snapshot.paramMap.get('userId');
    this.resetPasswordForm = this.formBuilder.group({
      password : ['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,}'), Validators.minLength(8)]],
      confirmPassword : ['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,}'), Validators.minLength(8)]]
    })
  }

  async presentToast(message:any) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  resetPassword(){
    this.service.resetPassword(this.resetPasswordForm.value,this.userId).subscribe((res)=>{
      if(res['status'] == "200"){
        this.presentToast(res['body']);
        this.router.navigate(['/']);
      }else{
        this.presentToast(res['body']);
      }
    })
  }

  ionViewWillEnter() {
    this.menu.enable(false);
  }
}
