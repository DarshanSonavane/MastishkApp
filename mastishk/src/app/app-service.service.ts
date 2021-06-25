import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppServiceService {
  baseUrl = "http://ec2-54-213-117-94.us-west-2.compute.amazonaws.com:8080/mastishq/"
  constructor(private http: HttpClient) { }
  
  doLogin = (data:any)=>{
    let url = this.baseUrl + "utils/loginUser";
    return this.http.post(url,data);
  }

  doRegister = (data:any)=>{
    data.roleId = "1";
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

}
