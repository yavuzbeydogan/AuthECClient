import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http:HttpClient) { }
  baseURL = 'http://10.211.55.4:5084/api';



  createUser(formData:any){
    return this.http.post(this.baseURL+'/signup',formData);
  }
    signin(formData:any){
    return this.http.post(this.baseURL+'/signin',formData);
  }
  isLoggedIn(){
    return localStorage.getItem('token') !== null ? true : false;
  }
  
}

