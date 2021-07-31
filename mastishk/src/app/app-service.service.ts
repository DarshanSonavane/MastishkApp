import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AppServiceService {
  baseUrl = "http://ec2-18-236-68-123.us-west-2.compute.amazonaws.com:8080/mastishq/"
  constructor(private http: HttpClient,private loadingCtrl: LoadingController) { }
  
  showLoader() {
    this.loadingCtrl.create({ message: "" }).then((res) => {
      res.present();
    })
  }

  hideLoader() {
    this.loadingCtrl.dismiss();
  }

  doLogin = (data:any)=>{
    let url = this.baseUrl + "utils/loginUser";
    return this.http.post(url,data);
  }

  doRegister = (data:any)=>{
    let url = this.baseUrl + "utils/signUpUser";
    return this.http.post(url,data);
  }

  forgotPassword = (data:any)=>{
    let url = this.baseUrl + "utils/forgotPassword?userName="+data.contactNumber;
    return this.http.post(url,null);
  }

  verifyOtp = (data:any,userId:any)=>{
    data.userId = userId;
    let url = this.baseUrl + "utils/verifyOtp/";
    return this.http.post(url,data);
  }

  resetPassword = (data:any , userId)=>{
    data.userId = userId;
    let url = this.baseUrl + "utils/updatePassword/";
    return this.http.post(url,data);
  }

  getStateList = ()=>{
    let url = this.baseUrl + "utils/getAllState/";
    return this.http.get(url);
  }

  getAllDistrictsForState=(stateId:any)=>{
    let url = this.baseUrl + `utils/getAllDistrictByStateId/${stateId}`;
    return this.http.get(url);
  }

  getUserDetailsByUserId=(userId:any , headers : any)=>{
    console.log("Headers=====",headers)
    let url = this.baseUrl + `user/getUserDetlsById?id=${userId}`;
    return this.http.get(url , {headers : headers});
  }

  updateUserDetails=(data:any , headers :any)=>{
    let userId = localStorage.getItem('userId');
    let newStateObj = {};
    let newDistrictObj = {};

    newStateObj['stateId'] = data.contactDetails.state;
    newStateObj['stateName'] = "";
    newDistrictObj['districtId'] = data.contactDetails.district;
    newDistrictObj['districtName'] = "";
    newDistrictObj['state'] = newStateObj;
    data.userId = parseInt(userId);

    data['age'] = parseInt(data.age);

    data['contactDetails']['state'] = newStateObj;
    data['contactDetails']['district'] = newDistrictObj;
    data['contactDetails']['addr1'] ="";
    data['contactDetails']['addr2'] ="";
    data['contactDetails']['contact_number'] ="";
    data['contactDetails']['email_id'] ="";
    data['contactDetails']['addr_type'] ="";
    data['contactDetails']['extra_field2'] ="";
    data['contactDetails']['id'] = data?.contactDetails?.contactId || null;
    if(data.vitalParameters){
      data['vitalParameters']['id']= data?.vitalParameters?.vitalId || null;
    }else{
      let obj = {
        "id": null,
        "pulse_rate": null,
        "blood_presure": null,
        "any_disability": false,
        "co_morbility": null,
        "extra_field1": null,
        "extra_field2": null
      }
      data['vitalParameters'] = obj;
        
    }
    
    if(data.massIndexDetails){
      data['massIndexDetails']['id']= data?.massIndexDetails?.massIndexId || null;
      data['massIndexDetails']['height']= parseInt(data?.massIndexDetails?.height) || null;
      data['massIndexDetails']['weight']= parseInt(data?.massIndexDetails?.weight) || null;
    }else {
      let massObj = {
        "id": null,
        "weight": 0,
        "height": 0,
        "menstrual_cycle": null,
        "last_menstrual_period": null,
        "duration_of_period": null,
        "length_of_period_cycle": null,
        "handedness": null,
        "is_support_required": false,
        "normal_walk": null,
        "fasial_palsy": null,
        "medical_history": null
      }
      data['massIndexDetails'] = massObj;
    }
    if(data.vitalParameters){
      delete data?.vitalParameters?.vitalId;
    }
    if(data.contactDetails){
      delete data?.contactDetails?.contactId;
    }
    if(data.massIndexDetails){
      delete data?.massIndexDetails?.massIndexId;
    }

    let url = this.baseUrl + "user/saveOrUpdateUser/";
    return this.http.post(url,data , {headers : headers});
  }

  updateDoctor=(data:any,headers)=>{
    let userId = localStorage.getItem('userId');
    
    let state = {};
    let district = {};
    let user = {};

    state['stateId'] = data.state;
    district['districtId'] = data.district;
    user['userId'] = userId;
    data.state = state;
    data.district = district;
    data.user = user;
    let url = this.baseUrl + "user/saveOrUpdateDoctor/";
    return this.http.post(url,data , {headers : headers});
  }

  updateHealthProfessional = (data:any,headers : any)=>{
    let userId = localStorage.getItem('userId');
    
    let state = {};
    let district = {};
    let user = {};

    state['stateId'] = data.state;
    district['districtId'] = data.district;
    user['userId'] = userId;
    data.state = state;
    data.district = district;
    data.user = user;
    let url = this.baseUrl + "user/saveOrUpdateMhp/";
    return this.http.post(url,data , {headers : headers});
  }

  /* getDoctorDetails = (userId:any , headers : any)=>{
    let userId = localStorage.getItem('userId');
    let url = this.baseUrl + "user/getDoctorDetlsById/";
    return this.http.post(url,data , {headers : headers});
  } */

  /* getMHPDetails = (userId:any , headers : any)=>{
    let userId = localStorage.getItem('userId');
    let url = this.baseUrl + "user/getMhpDetlsById/";
    return this.http.post(url,data , {headers : headers});
  } */

}