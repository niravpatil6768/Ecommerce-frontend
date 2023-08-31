import { Injectable } from '@angular/core';
//import Cookies from 'js-cookie';
import { Token } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  public setRole(role: string){
    localStorage.setItem("role",role);
  }

  public getRole(){
    return localStorage.getItem("role");
  }

  public setToken(jwtToken:string){
    console.log("21"+jwtToken);
    localStorage.setItem("token",jwtToken);
  }

  public getToken(){
    return localStorage.getItem("token");
  }

  
  
  
  
  
  

  public getResetToken(){
    return localStorage.getItem("resetToken")
  }

  public clear(){
    localStorage.clear();
  }

  public isLoggedIn(){
    return  this.getToken();
  }
}
