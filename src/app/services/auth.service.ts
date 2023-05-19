import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl:string="https://localhost:7079/api/User/";
  constructor(private http:HttpClient) { }

  signUp(userObj:any){
    /* return this.http.post<any>('${this.baseUrl}register',userObj); */
    return this.http.post<any>(this.baseUrl+'register',userObj);
  }

  login(loginObj:any){
    /* return this.http.post<any>('${this.baseUrl}authenticate',loginObj); */
    return this.http.post<any>(this.baseUrl+'authenticate',loginObj);
  }

  storeToken(tokenValue:string){
    localStorage.setItem('token',tokenValue);
  }

  getToken(){
    return localStorage.getItem('token');
  }

  isLoggedIn():boolean{
    //if local storage has value it'll return true otherwise false.
    return !!localStorage.getItem('token');
  }
}
