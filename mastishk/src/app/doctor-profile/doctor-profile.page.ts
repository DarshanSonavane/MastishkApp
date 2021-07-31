import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { AppServiceService } from '../app-service.service'
import { ToastController , MenuController } from '@ionic/angular';

@Component({
  selector: 'app-doctor-profile',
  templateUrl: './doctor-profile.page.html',
  styleUrls: ['./doctor-profile.page.scss'],
})
export class DoctorProfilePage implements OnInit {

  doctorForm : FormGroup;

  stateList:any = [];
  districtsForState:any = [];

  specialityArr:any = "";/* [{
    "name":"Psychiatrist",
    "value":"psychiatrist"
  },{
    "name":"ENT",
    "value":"ent"
  },{
    "name":"Gastroenterologist",
    "value":"gastro"
  },{
    "name":"General Physician",
    "value":"general_physician"
  },{
    "name":"Cardiologist",
    "value":"cardiologist"
  },{
    "name":"Gynecologist",
    "value":"gynecologist"
  },{
    "name":"Endocrinologist",
    "value":"endocrinologist"
  },{
    "name":"Diabetologist",
    "value":"diabetologist"
  },{
    "name":"Orthopedician",
    "value":"orthopedician"
  },{
    "name":"Dermatologist",
    "value":"dermatologist"
  },{
    "name":"Pediatrician",
    "value":"pediatrician"
  },{
    "name":"Other",
    "value":"Other"
  }]; */

  clinicType = [{
    "name":"Self",
    "value":"self"
  },{
    "name":"Associated",
    "value":"associated"
  }];

  patientCount = [{
    "name":"Less than 10",
    "value":"lt10"
  },{
    "name":"10-30",
    "value":"10-30"
  },{
    "name":"Above 30",
    "value":"above-30"
  }];

  regWithState:any =  "";
  medicalRegNum:any = "";
  speciality:any = "";
  selfProfileSummury:any = "";
  associatedHospital:any = "";
  resident:any = "";
  clinic:any = "";
  clinicAddress:any = "";
  state:any = "";
  district:any = "";
  city:any = "";
  howManyPatientsPresent:any = "";
  selectedStateId:any = "";
  id:any = "";

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
    this.getDoctorDetails();
    this.getDoctorsSpecilaities();
    this.doctorForm = this.formBuilder.group({
      regWithState : ['', Validators.compose([ Validators.pattern('[a-zA-Z]*'), Validators.required])],
      medicalRegNum : ['', Validators.compose([ Validators.pattern('[a-zA-Z]*'), Validators.required])],
      speciality : ['', Validators.compose([Validators.pattern('[a-zA-Z]*'), Validators.required])],
      selfProfileSummury : ['', Validators.compose([Validators.required])],
      associatedHospital : ['', Validators.compose([Validators.required])],
      resident : ['', Validators.compose([Validators.required])],
      clinic : ['', Validators.compose([Validators.required])],
      clinicAddress : ['', Validators.compose([Validators.required])],
      state : ['', Validators.compose([Validators.required])],
      district : ['', Validators.compose([Validators.required])],
      city : ['', Validators.compose([Validators.required])],
      howManyPatientsPresent : ['', Validators.compose([Validators.required])],
      id : ['', Validators.compose([Validators.required])]
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

  submitDoctor=()=>{
    let token = localStorage.getItem('token');
    let header =  {
      'Authorization' : token
    }
    this.service.showLoader();
    console.log(this.doctorForm.value);
    this.service.updateDoctor(this.doctorForm.value,header).subscribe((res)=>{
      if(res){
        this.service.hideLoader();
        this.presentToast("Doctor profile updated successfully!");
        this.router.navigate(['/dashboard']);
      }
    },error=>{
      this.service.hideLoader();
    })
  }

  getDoctorDetails = ()=>{
    let userId = localStorage.getItem('userId'); 
    let token = localStorage.getItem('token');
    let header =  {
      'Authorization' : token
    }
    this.service.showLoader();
    this.service.getDoctorDetails(userId,header).subscribe((res)=>{
      this.service.hideLoader();
      if(res){
        let doctorDetails = res;
        console.log("doctorDetails",doctorDetails);
        this.regWithState = parseInt(doctorDetails && doctorDetails['regWithState']);
        this.medicalRegNum = doctorDetails && doctorDetails['medicalRegNum'];
        this.speciality = doctorDetails && doctorDetails['speciality'];
        this.selfProfileSummury = doctorDetails && doctorDetails['selfProfileSummury'];
        this.associatedHospital = doctorDetails && doctorDetails['associatedHospital'];
        this.resident = doctorDetails && doctorDetails['resident'];
        this.clinic = doctorDetails && doctorDetails['clinic'];
        this.clinicAddress = doctorDetails && doctorDetails['clinicAddress'];
        this.state = doctorDetails && doctorDetails['state']['stateId'];
        this.id = doctorDetails && doctorDetails['id']; 
        if(this.state){
          this.service.getAllDistrictsForState(this.state).subscribe((res)=>{
            if(res){
              this.districtsForState = res;
              this.district = doctorDetails && doctorDetails['district']['districtId'];
            }
          })
        }
        this.city = doctorDetails && doctorDetails['city'];
        this.howManyPatientsPresent = doctorDetails && doctorDetails['howManyPatientsPresent'];
        console.log("---speciality----",this.speciality);
      }
    })
  }

  getDoctorsSpecilaities = () => {
    this.service.getSpacialityList().subscribe((res)=>{
      if(res){
        this.specialityArr = res;
      }
    })
  }

}
