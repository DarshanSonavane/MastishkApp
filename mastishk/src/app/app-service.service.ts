import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppServiceService {
  baseUrl = "http://ec2-54-213-117-94.us-west-2.compute.amazonaws.com:8080/mastishq"
  constructor(private http: HttpClient) { }
  
  doLogin = (data:any)=>{
    let url = this.baseUrl + "/loginUser";
    return this.http.post(url,data);
  }

  doRegister = (data:any)=>{
    let url = this.baseUrl + "/signUpUser";
    return this.http.post(url,data);
  }

  forgotPassword = (data:any)=>{
    let url = this.baseUrl + "/forgotPassword";
    return this.http.post(url,data);
  }

  verifyOtp = (data:any)=>{
    let url = this.baseUrl + "/verifyOtp";
    return this.http.post(url,data);
  }
}
