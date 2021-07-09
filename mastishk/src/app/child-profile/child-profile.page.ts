import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { AppServiceService } from '../app-service.service'
import { ToastController , MenuController } from '@ionic/angular';

@Component({
  selector: 'app-child-profile',
  templateUrl: './child-profile.page.html',
  styleUrls: ['./child-profile.page.scss'],
})
export class ChildProfilePage implements OnInit {

  childProfileForm : FormGroup;

  firstName:any = "";
  middleName:any = "";
  lastName:any = "";
  age:any="";
  gender:any="";
  school:any="";
  typeOfSchool:any="";
  schooleClass:any="";
  motherName:any="";
  motherOccuption:any="";
  fatherName:any="";
  fatherOccuption:any="";
  resident_type:any = "";
  languageKnown:any = "";
  extra_field1:any = "";
  sleep:any = "";
  appitite:any = "";
  emotionalTramua:any="";
  infectiousDisease:any="";
  abortionAttempt:any="";
  deliveryTerm:any="";
  placeOfDevlivery:any="";
  termOfDelivery:any="";
  birthWeight:any="";
  birthCry:any="";
  complDuringDelivery:any="";
  immunization:any="";
  typeOfDelivery:any="";

  stateList:any = [];
  districtsForState:any = [];

  selectedStateId:any = "";

  state:any=""
  district:any="";

  genderArr = [{
    "name":"Male",
    "value":"M"
  },{
    "name":"Female",
    "value":"F"
  }]

  schoolType = [{
    "name":"Special School",
    "value":"special_school"
  },{
    "name":"Normal School",
    "value":"normal_school"
  }]

  residentType = [{
    "name":"Rural",
    "value":"rural"
  },{
    "name":"Urban",
    "value":"urban"
  }];

  familyIncome = [{
    "name":"Below 10 Lakhs",
    "value":"below_10_lakhs"
  },{
    "name":"10-20 Lakhs",
    "value":"10-20_lakhs"
  },{
    "name":"20-30 Lakhs",
    "value":"20-30_lakhs"
  },{
    "name":"Above 30 lakhs",
    "value":"above_30_lakhs"
  }];

  sleepType = [{
    "name":"Normal (Sleeps for atleast 8 hrs, fixed time of sleep and doesnt wake up during the night)",
    "value":"normal"
  },{
    "name":"Sleeping more than ususal",
    "value":"more_than_usual"
  },{
    "name":"Sleeping less than usual",
    "value":"less_than_usual"
  },{
    "name":"Wakes up frequently during night",
    "value":"wake_up_frequently"
  }];

  appititeType = [{
    "name":"Normal",
    "value":"normal"
  },{
    "name":"Eating more than usual",
    "value":"more_than_usual"
  },{
    "name":"Eating less than usual",
    "value":"less_than_usual"
  }];

  motherExposed = [{
    "name":"Yes",
    "value":true
  },{
    "name":"No",
    "value":false
  }]

  deliveryTerms = [{
    "name":"Full Term (37 weeks/9months)",
    "value":"full_Term"
  },{
    "name":"Pre Term (28-32 weeks/7-8 months)",
    "value":"pre_term"
  },{
    "name":"Post Term (40-42 weeks/10 months)",
    "value":"post_term"
  }]

  devliveryPlace = [{
    "name":"Hospital",
    "value":"hospital"
  },{
    "name":"Home",
    "value":"home"
  },{
    "name":"Other",
    "value":"other"
  }]

  typeOfDeliveryArr = [{
    "name":"Normal(Vaginal Birth)",
    "value":"normal"
  },{
    "name":"Ceaserian(Surgical delivery)",
    "value":"ceaserian"
  },{
    "name":"Instrumental(Forceps delivery)",
    "value":"instrumental"
  }]

  weight = [{
    "name":"Normal(2.5-2.9 Kgs)",
    "value":"normal"
  },{
    "name":"Above normal(3-4.5 Kgs)",
    "value":"above_normal"
  },{
    "name":"Below Normal( Less than 2.5 Kgs)",
    "value":"below_normal"
  }]

  cryType = [{
    "name":"Present(Immediately cried)",
    "value":"present"
  },{
    "name":"Delayed(Cried after some time)",
    "value":"delayed"
  },{
    "name":"Absent(No birth cry)",
    "value":"absent"
  }]

  immuneArr = [{
    "name":"Going as per schedule provided by the doctor",
    "value":"as_per_schedule"
  },{
    "name":"Behind schedule",
    "value":"behind_schdule"
  }] 

  constructor(private router :Router , public formBuilder: FormBuilder , public service :AppServiceService , public toastController : ToastController , public menu : MenuController) { 
    this.getStateList();
  }

  ionViewWillEnter() {
    this.menu.enable(false);
  }

  ngOnInit() {
    this.getUserData();
    this.childProfileForm = this.formBuilder.group({
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
      
      type : [''],
      child : [''],

      
      school:['', Validators.compose([Validators.required])],
      typeOfSchool:['', Validators.compose([Validators.required])],
      schooleClass:['', Validators.compose([Validators.required])],
      motherOccuption:['', Validators.compose([Validators.required])],
      fatherName:['', Validators.compose([Validators.required])],
      fatherOccuption:['', Validators.compose([Validators.required])],
      resident_type: ['', Validators.compose([Validators.required])],
      
      sleep: ['', Validators.compose([Validators.required])],
      appitite: ['', Validators.compose([Validators.required])],
      emotionalTramua:['', Validators.compose([Validators.required])],
      infectiousDisease:['', Validators.compose([Validators.required])],
      abortionAttempt:['', Validators.compose([Validators.required])],
      deliveryTerm:['', Validators.compose([Validators.required])],
      placeOfDevlivery:['', Validators.compose([Validators.required])],
      termOfDelivery:['', Validators.compose([Validators.required])],
      birthWeight:['', Validators.compose([Validators.required])],
      birthCry:['', Validators.compose([Validators.required])],
      complDuringDelivery:['', Validators.compose([Validators.required])],
      immunization:['', Validators.compose([Validators.required])],
      typeOfDelivery:['', Validators.compose([Validators.required])],

      contactDetails: this.formBuilder.group({
        state: ['', Validators.compose([Validators.required])],
        district : ['', Validators.compose([Validators.required])],
        resident_type : ['', Validators.compose([Validators.required])],
        contactId : [''],
        languageKnown: ['', Validators.compose([Validators.required])],
        extra_field1 : ['', Validators.compose([Validators.required])],
      }),
    })
  }

  getUserData=()=>{
    let userId = localStorage.getItem('userId'); 
    let token = localStorage.getItem('token');
    let header =  {
      'Authorization' : token
    }
    this.service.showLoader();
    this.service.getUserDetailsByUserId(userId , header).subscribe((res)=>{
      this.service.hideLoader();
      if(res['status']=='200'){
        console.log(res['body']);

        let userDetails = res['body'];
        let contactDetails = userDetails?.contactDetails
        

        /* this.firstName = userDetails?.firstName || "";
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
        

        this.selectedStateId = contactDetails?.state?.stateId || "";
        if(this.selectedStateId){
          this.onStateChange();
        } */
      }
    },error=>{
      this.service.hideLoader();
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

  async presentToast(message:any) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  updateChildProfile=()=>{
    let token = localStorage.getItem('token');
    let header =  {
      'Authorization' : token
    }
    this.service.updateUserDetails(this.childProfileForm.value,header).subscribe((res)=>{
      if(res){
        this.presentToast("Child profile updated successfully!");
        this.router.navigate(['/dashboard']);
      }
    })
  }

}
