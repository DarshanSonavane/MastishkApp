import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AppServiceService {
  baseUrl = "http://ec2-54-189-155-197.us-west-2.compute.amazonaws.com:8080/mastishq/"
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

    data['vitalParameters']['id']= data?.vitalParameters?.vitalId || null;
    data['massIndexDetails']['id']= data?.massIndexDetails?.massIndexId || null;
    data['massIndexDetails']['height']= parseInt(data?.massIndexDetails?.height) || null;
    data['massIndexDetails']['weight']= parseInt(data?.massIndexDetails?.weight) || null;

    delete data?.vitalParameters?.vitalId;
    delete data?.contactDetails?.contactId;
    delete data?.massIndexDetails?.massIndexId;

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

}