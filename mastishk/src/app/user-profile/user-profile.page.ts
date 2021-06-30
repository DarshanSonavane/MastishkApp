import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { AppServiceService } from '../app-service.service'
import { ToastController , MenuController } from '@ionic/angular';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
})
export class UserProfilePage implements OnInit {
  userProfileForm : FormGroup;

  genders = [{
    'name':"Male",
    'value':'M'
  },{
    'name':"Female",
    'value':'F'
  }];

  disablites = [{
    'name':"Yes",
    'value':true
  },{
    'name':"No",
    'value':false
  }]

  stateList:any = [];
  districtsForState:any = [];

  firstName:any = "";
  middleName:any = "";
  lastName:any = "";
  age:any = "";
  gender:any = "";
  education:any = "";
  occuption:any = "";
  maritialStatus:any = "";
  state:any = "";
  district:any = "";
  resident_type:any = "";
  extra_field1:any = "";
  pulse_rate:any = "";
  blood_presure:any = "";
  any_disability:any = "";
  co_morbility:any = "";
  weight:any = "";
  height:any = "";
  menstrual_cycle:any = "";
  last_menstrual_period:any = "";
  duration_of_period:any = "";
  length_of_period_cycle:any = "";
  handedness:any = "";
  is_support_required:any = "";
  normal_walk:any = "";
  fasial_palsy:any = "";
  medical_history:any = "";
  contactId:any = "";
  vitalId:any = "";
  massIndexId:any = "";
  child:any = false;
  type:any = "";
  fathersName:any = ""
  fathersOccuption:any = ""
  motherName:any = ""
  mothersOccuption:any = "" 


  isMale = true;
  selectedStateId:any = "";

  constructor(private router :Router , public formBuilder: FormBuilder , public service :AppServiceService , public toastController : ToastController , public menu : MenuController) {
    this.getStateList();
  }

  ionViewWillEnter() {
    this.menu.enable(false);
  }

  ngOnInit() {
    this.getUserData();
    this.userProfileForm = this.formBuilder.group({
      firstName : ['', Validators.compose([ Validators.pattern('[a-zA-Z]*'), Validators.required])],
      middleName : ['', Validators.compose([ Validators.pattern('[a-zA-Z]*'), Validators.required])],
      lastName : ['', Validators.compose([Validators.pattern('[a-zA-Z]*'), Validators.required])],
      gender : ['', Validators.compose([Validators.required])],
      age : ['', Validators.compose([Validators.required])],
      education : ['', Validators.compose([Validators.required])],
      occuption : ['', Validators.compose([Validators.required])],
      maritialStatus : ['', Validators.compose([Validators.required])],
      fathersName : ['', Validators.compose([Validators.required])],
      fathersOccuption : ['', Validators.compose([Validators.required])],
      motherName : ['', Validators.compose([Validators.required])],
      mothersOccuption : ['', Validators.compose([Validators.required])],
      extra_field1 : ['', Validators.compose([Validators.required])],
      type : [''],
      child : [''],

      contactDetails: this.formBuilder.group({
        state: ['', Validators.compose([Validators.required])],
        district : ['', Validators.compose([Validators.required])],
        resident_type : ['', Validators.compose([Validators.required])],
        contactId : [''],
      }),
      vitalParameters: this.formBuilder.group({ 
        pulse_rate: ['', Validators.compose([Validators.required])],
        blood_presure: ['', Validators.compose([Validators.required])],
        any_disability: ['', Validators.compose([Validators.required])],
        co_morbility: ['', Validators.compose([Validators.required])],
        extra_field1: ['', Validators.compose([Validators.required])],
        extra_field2: ['', Validators.compose([Validators.required])],
        vitalId : [''],
      }),
      massIndexDetails: this.formBuilder.group({ 
        weight: ['', Validators.compose([Validators.required])],
        height: ['', Validators.compose([Validators.required])],
        menstrual_cycle: ['', Validators.compose([Validators.required])],
        last_menstrual_period: ['', Validators.compose([Validators.required])],
        duration_of_period: ['', Validators.compose([Validators.required])],
        length_of_period_cycle: ['', Validators.compose([Validators.required])],
        handedness: ['', Validators.compose([Validators.required])],
        is_support_required: false,
        normal_walk: ['', Validators.compose([Validators.required])],
        fasial_palsy: ['', Validators.compose([Validators.required])],
        medical_history: ['', Validators.compose([Validators.required])],
        massIndexId : [''],
        }),
    })
  }

  getUserData=()=>{
    let userId = localStorage.getItem('userId'); 
    let token = localStorage.getItem('token');
    let header =  {
      'Authorization' : token
    }
    this.service.getUserDetailsByUserId(userId , header).subscribe((res)=>{
      if(res['status']=='200'){
        console.log(res['body']);

        let userDetails = res['body'];
        let contactDetails = userDetails?.contactDetails
        let vitalParameters = userDetails?.vitalParameters;
        let massIndexDetails = userDetails?.massIndexDetails;
        // Show the prepopulated data with the help of data from server

        this.firstName = userDetails?.firstName || "";
        this.lastName = userDetails?.lastName || "" ;
        this.age = userDetails?.age || "";
        this.gender = userDetails?.gender || "";
        this.education = userDetails?.education || "";
        this.occuption = userDetails?.occuption || "";
        this.maritialStatus = userDetails?.maritialStatus || "";
        this.child = userDetails?.child || false;
        this.type = userDetails?.type || "";
        this.state = contactDetails?.state?.stateId || "";
        this.district = contactDetails?.district?.districtId || "";
        this.resident_type = contactDetails?.resident_type || "";
        this.contactId = contactDetails?.id || ""
        this.extra_field1 = userDetails?.extra_field1 || "";
        this.vitalId = vitalParameters?.id || "";
        this.pulse_rate = vitalParameters?.pulse_rate || "";
        this.blood_presure = vitalParameters?.blood_presure || "";
        this.any_disability = vitalParameters?.any_disability || "";
        this.co_morbility = vitalParameters?.co_morbility || "";
        this.massIndexId = massIndexDetails?.id || "";
        this.weight = massIndexDetails?.weight || "";
        this.height = massIndexDetails?.height || "";
        this.menstrual_cycle = massIndexDetails?.menstrual_cycle || "";
        this.last_menstrual_period = massIndexDetails?.last_menstrual_period || "";
        this.duration_of_period = massIndexDetails?.duration_of_period || "";
        this.length_of_period_cycle = massIndexDetails?.length_of_period_cycle || "";
        this.handedness = massIndexDetails?.handedness || "";
        this.is_support_required = massIndexDetails?.is_support_required || "";
        this.normal_walk = massIndexDetails?.normal_walk || "";
        this.fasial_palsy = massIndexDetails?.fasial_palsy || "";
        this.medical_history = massIndexDetails?.medical_history || "";

        this.selectedStateId = contactDetails?.state?.stateId || "";
        if(this.selectedStateId){
          this.onStateChange();
        }
      }
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

  onGenderChange=()=>{
    let selectedGender = this.userProfileForm.get('gender').value;
    if(selectedGender == 'F'){
      this.isMale = false;
    }else{
      this.isMale = true;
    }
  }

  updateProfile(){
    let token = localStorage.getItem('token');
    let header =  {
      'Authorization' : token
    }
    this.service.updateUserDetails(this.userProfileForm.value, header).subscribe((res)=>{
      if(res){
        // Navigate to Dashboard
        this.router.navigate(['/dashboard']);
      }
    })
    console.log(this.userProfileForm.value);
  }

}
