import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { AppServiceService } from '../app-service.service'
import { ToastController , MenuController } from '@ionic/angular';

@Component({
  selector: 'app-registeration',
  templateUrl: './registeration.page.html',
  styleUrls: ['./registeration.page.scss'],
})
export class RegisterationPage implements OnInit {
  registrationForm : FormGroup;
  isSubmitted = false;

  constructor(private router :Router , public formBuilder: FormBuilder , public service :AppServiceService , public toastController : ToastController , public menu : MenuController) { }

  roleType = [{
    'type':'Child',
    'value':true
  },{
    'type':'Adult',
    'value':false
  }];

  role = [{
    'name':'Self',
    'value':'1'
  },{
    'name':'Doctor',
    'value':'2'
  },{
    'name':'Health Worker',
    'value':'3'
  }]

  ionViewWillEnter() {
    this.menu.enable(false);
  }

  ngOnInit() {
    this.registrationForm = this.formBuilder.group({
      firstName : ['', Validators.compose([ Validators.pattern('[a-zA-Z]*'), Validators.required])],
      lastName : ['', Validators.compose([Validators.pattern('[a-zA-Z]*'), Validators.required])],
      email : ['', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])],
      contactNumber : ['', Validators.compose([Validators.maxLength(10), Validators.pattern('[0-9]{10}'), Validators.required])],
      roleId : ['', Validators.compose([Validators.required])],
      child:[''],
      password : ['', Validators.compose([Validators.maxLength(8), Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,}'), Validators.required])],
      confirmPassword : ['', Validators.compose([Validators.maxLength(8), Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,}'), Validators.required])],
    })
  }

  get errorControl() {
    return this.registrationForm.controls;
  }

  async presentToast(message:any) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  goToLogin(){
    this.router.navigate(['/']);
  }

  doRegister(){
    this.isSubmitted = true;
    console.log(this.registrationForm.value);
    /* if(!this.registrationForm.valid){
      console.log('Please provide all the required values!')
      return false;
    }else { */
      this.service.showLoader();
      this.service.doRegister(this.registrationForm.value).subscribe((res)=>{
        this.service.hideLoader();
        if(res['status'] == "200"){
          this.presentToast(res['status']);
          this.router.navigate(['/']);
        }else{
          this.presentToast(res['description']);
        }
      },error=>{
        this.service.hideLoader();
      });
      console.log(this.registrationForm.value)
    // }
  }

}
