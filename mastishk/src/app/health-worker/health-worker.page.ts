import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { AppServiceService } from '../app-service.service'
import { ToastController , MenuController } from '@ionic/angular';

@Component({
  selector: 'app-health-worker',
  templateUrl: './health-worker.page.html',
  styleUrls: ['./health-worker.page.scss'],
})
export class HealthWorkerPage implements OnInit {

  healthWorkerForm : FormGroup;

  stateList:any = [];
  districtsForState:any = [];

  iAmArr = [{
    "name":"Nurse",
    "value":"nurse"
  },{
    "name":"Social Worker",
    "value":"social_worker"
  },{
    "name":"Asha Worker",
    "value":"asha_worker"
  },{
    "name":"Anganwadi Worker",
    "value":"anganwadi_worker"
  }];

  highestEducationArr = [{
    "name":"CLASS 10",
    "value":"class10"
  },{
    "name":"CLASS 12",
    "value":"class12"
  },{
    "name":"BA",
    "value":"ba"
  },{
    "name":"BSc",
    "value":"bsc"
  },{
    "name":"MA",
    "value":"ma"
  },{
    "name":"MSc",
    "value":"msc"
  },{
    "name":"MSW",
    "value":"msw"
  },{
    "name":"M.Phil",
    "value":"mphil"
  }]

  workingTypeArr = [{
    "name":"Independent",
    "value":"independent"
  },{
    "name":"Associated",
    "value":"associated"
  }]

  state:any = "";
  district:any = "";
  piAm:any = "";
  highestEducation:any = "";
  registeredWith:any = "";
  resident:any = "";
  currentlyWorking:any = "";
  nameOfHospital:any = "";
  hospitalAddress:any = "";
  city:any = "";
  id:any = "";

  selectedStateId:any = "";

  constructor(private router :Router , public formBuilder: FormBuilder , public service :AppServiceService , public toastController : ToastController , public menu : MenuController) {
    this.getStateList();
  }

  ionViewWillEnter() {
    this.menu.enable(false);
  }

  onStateChange=()=>{
    this.selectedStateId = !this.selectedStateId ? this.state : this.selectedStateId;
    if(this.selectedStateId != ""){
      this.service.getAllDistrictsForState(this.selectedStateId).subscribe((res)=>{
        if(res){
          this.districtsForState = res;
        }
      })
    }
  }

  ngOnInit() {
    this.getHealthWorkerDetails();
    this.healthWorkerForm = this.formBuilder.group({
      state: ['', Validators.compose([Validators.required])],
      district: ['', Validators.compose([Validators.required])],
      piAm: ['', Validators.compose([Validators.required])],
      highestEducation: ['', Validators.compose([Validators.required])],
      registeredWith: ['', Validators.compose([Validators.required])],
      resident:['', Validators.compose([Validators.required])],
      currentlyWorking: ['', Validators.compose([Validators.required])],
      nameOfHospital: ['', Validators.compose([Validators.required])],
      hospitalAddress: ['', Validators.compose([Validators.required])],
      city: ['', Validators.compose([Validators.required])],
      id : ['', Validators.compose([Validators.required])],
    })
  }

  getStateList=()=>{
    this.service.getStateList().subscribe((res)=>{
      if(res){
        console.log(res)
        this.stateList = res;
      }
    })
  }

  async presentToast(message:any) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  submitHealthWorker=()=>{
    let token = localStorage.getItem('token');
    let header =  {
      'Authorization' : token
    }
    this.service.showLoader();
    this.service.updateHealthProfessional(this.healthWorkerForm.value,header).subscribe((res)=>{
      if(res){
        this.service.hideLoader();
        this.presentToast("Health worker profile updated successfully!");
        this.router.navigate(['/dashboard']);
      }
    },error=>{
      this.service.hideLoader();
    })
  }

  getHealthWorkerDetails = () =>{
    let userId = localStorage.getItem('userId'); 
    let token = localStorage.getItem('token');
    let header =  {
      'Authorization' : token
    }
    this.service.getMHPDetails(userId,header).subscribe((res)=>{
      if(res){
        let mhpDetails = res;
        console.log("mhpDetails",mhpDetails);
        this.state = mhpDetails && mhpDetails['state']['stateId'];
        if(this.state){
          this.service.getAllDistrictsForState(this.state).subscribe((res)=>{
            if(res){
              this.districtsForState = res;
              this.district = mhpDetails && mhpDetails['district']['districtId'];
            }
          })
        }
        this.piAm = mhpDetails && mhpDetails['piAm'];
        this.highestEducation = mhpDetails && mhpDetails['highestEducation'];
        this.registeredWith = mhpDetails && mhpDetails['registeredWith'];
        this.resident = mhpDetails && mhpDetails['resident'];
        this.currentlyWorking = mhpDetails && mhpDetails['currentlyWorking'];
        this.nameOfHospital = mhpDetails && mhpDetails['nameOfHospital'];
        this.hospitalAddress = mhpDetails && mhpDetails['hospitalAddress'];
        this.city = mhpDetails && mhpDetails['city'];
        this.id = mhpDetails && mhpDetails['id']; 
      }
    })
  }
}
